import axios, { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

// Types
interface ApiError {
    message: string;
    status: number;
    timestamp: string;
}

interface RetryConfig {
    retries: number;
    retryDelay: number;
    retryCondition: (error: AxiosError) => boolean;
}

class HttpService {
    private static instance: HttpService;
    private axiosInstance: AxiosInstance;
    private readonly retryConfig: RetryConfig;
    private readonly timeoutMs = 30000; // 30 seconds

    private constructor() {
        this.retryConfig = {
            retries: 3,
            retryDelay: 1000,
            retryCondition: (error: AxiosError) => {
                return !error.response || (error.response.status >= 500 && error.response.status < 600);
            }
        };

        // Determine base URL: use relative paths in production client-side for nginx proxy
        const getBaseUrl = () => {
            if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
                // Client-side production: use relative paths (nginx proxy)
                return '';
            }
            // Server-side or development: use environment variable
            return process.env.NEXT_PUBLIC_BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
        };

        this.axiosInstance = axios.create({
            baseURL: getBaseUrl(),
            timeout: this.timeoutMs,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        this.setupRequestInterceptor();
        this.setupResponseInterceptor();
    }

    private setupRequestInterceptor(): void {
        this.axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig) => {
                try {
                    // Add request timestamp for logging
                    config.metadata = { startTime: new Date() };
                    
                    // Get token from session or localStorage
                    const session = await getSession();
                    const sessionToken = session?.user?.accessToken;
                    const localToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                    
                    const token = sessionToken || localToken;
                    
                    if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }

                    this.logRequest(config);
                    return config;
                } catch (error) {
                    this.logError('Request interceptor error:', error);
                    return config;
                }
            },
            (error: AxiosError) => {
                this.logError('Request error:', error);
                return Promise.reject(this.formatError(error));
            }
        );
    }

    private setupResponseInterceptor(): void {
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse) => {
                this.logResponse(response);
                return response;
            },
            async (error: AxiosError) => {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number };
                
                // Handle 401 Unauthorized - token refresh logic can be added here
                if (error.response?.status === 401) {
                    await this.handleUnauthorized();
                }

                // Retry logic
                if (this.shouldRetry(error, originalRequest)) {
                    return this.retryRequest(originalRequest);
                }

                this.logError('Response error:', error);
                return Promise.reject(this.formatError(error));
            }
        );
    }

    private shouldRetry(error: AxiosError, config: InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number }): boolean {
        if (config._retry) return false;
        if (!this.retryConfig.retryCondition(error)) return false;
        
        const retryCount = config._retryCount || 0;
        return retryCount < this.retryConfig.retries;
    }

    private async retryRequest(config: InternalAxiosRequestConfig & { _retry?: boolean; _retryCount?: number }): Promise<AxiosResponse> {
        config._retry = true;
        config._retryCount = (config._retryCount || 0) + 1;
        
        const delay = this.retryConfig.retryDelay * Math.pow(2, config._retryCount - 1); // Exponential backoff
        await this.sleep(delay);
        
        this.logInfo(`Retrying request (attempt ${config._retryCount}/${this.retryConfig.retries}): ${config.url}`);
        return this.axiosInstance.request(config);
    }

    private async handleUnauthorized(): Promise<void> {
        // Clear tokens
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
        
        // Redirect to login page or refresh token logic can be implemented here
        this.logWarning('Unauthorized access - tokens cleared');
    }

    private formatError(error: AxiosError): ApiError {
        const status = error.response?.status || 0;
        const responseData = error.response?.data as any;
        const message = responseData?.message || error.message || 'An unexpected error occurred';
        
        return {
            message,
            status,
            timestamp: new Date().toISOString()
        };
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Logging methods
    private logRequest(config: InternalAxiosRequestConfig): void {
        if (process.env.NODE_ENV === 'development') {
            console.log(`🚀 [HTTP] ${config.method?.toUpperCase()} ${config.url}`, {
                headers: config.headers,
                data: config.data
            });
        }
    }

    private logResponse(response: AxiosResponse): void {
        if (process.env.NODE_ENV === 'development') {
            const duration = response.config.metadata?.startTime 
                ? Date.now() - response.config.metadata.startTime.getTime()
                : 0;
            
            console.log(`✅ [HTTP] ${response.status} ${response.config.url} (${duration}ms)`, {
                data: response.data
            });
        }
    }

    private logError(message: string, error: any): void {
        if (process.env.NODE_ENV === 'development') {
            console.error(`❌ [HTTP] ${message}`, error);
        }
    }

    private logWarning(message: string): void {
        if (process.env.NODE_ENV === 'development') {
            console.warn(`⚠️ [HTTP] ${message}`);
        }
    }

    private logInfo(message: string): void {
        if (process.env.NODE_ENV === 'development') {
            console.info(`ℹ️ [HTTP] ${message}`);
        }
    }

    // Public methods
    public static getInstance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService();
        }
        return HttpService.instance;
    }

    public getAxiosInstance(): AxiosInstance {
        return this.axiosInstance;
    }

    public updateBaseURL(newBaseURL: string): void {
        this.axiosInstance.defaults.baseURL = newBaseURL;
    }

    public setAuthToken(token: string): void {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    public clearAuthToken(): void {
        delete this.axiosInstance.defaults.headers.common['Authorization'];
    }

    // Convenient HTTP methods
    public async get<T = any>(url: string, config?: any): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, config);
        return response.data;
    }

    public async post<T = any>(url: string, data?: any, config?: any): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data, config);
        return response.data;
    }

    public async put<T = any>(url: string, data?: any, config?: any): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data, config);
        return response.data;
    }

    public async delete<T = any>(url: string, config?: any): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url, config);
        return response.data;
    }

    public async patch<T = any>(url: string, data?: any, config?: any): Promise<T> {
        const response = await this.axiosInstance.patch<T>(url, data, config);
        return response.data;
    }
}

// Extend Axios types for metadata
declare module 'axios' {
    export interface InternalAxiosRequestConfig {
        metadata?: {
            startTime: Date;
        };
    }
}

export default HttpService.getInstance();