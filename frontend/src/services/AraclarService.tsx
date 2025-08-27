import HttpService from "./HttpService";
import { AracContent, AraclarRootObject } from "@/types/MyTypes.d";

// Types for API parameters and responses
interface GetAraclarParams {
    pageNum: number;
    sortField?: string;
    sortDir?: 'asc' | 'desc';
    keyword?: string;
}

interface ApiResponse<T> {
    data: T;
    message?: string;
    success?: boolean;
}

interface ServiceResult<T> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        status?: number;
    };
}

class AraclarService {
    private static readonly BASE_PATH = '/api/araclar';
    
    // Default parameters
    private static readonly DEFAULT_SORT_FIELD = 'id';
    private static readonly DEFAULT_SORT_DIR: 'asc' | 'desc' = 'desc';
    private static readonly DEFAULT_KEYWORD = '';

    /**
     * Retrieves paginated list of vehicles
     */
    static async getAraclar(params: GetAraclarParams): Promise<ServiceResult<AraclarRootObject>> {
        try {
            // Validate parameters
            this.validatePageNum(params.pageNum);
            
            const {
                pageNum,
                sortField = this.DEFAULT_SORT_FIELD,
                sortDir = this.DEFAULT_SORT_DIR,
                keyword = this.DEFAULT_KEYWORD
            } = params;

            // Build query parameters
            const queryParams = new URLSearchParams({
                sortField,
                sortDir,
                keyword
            });

            const url = `${this.BASE_PATH}/page/${pageNum + 1}?${queryParams.toString()}`;
            const data = await HttpService.get<AraclarRootObject>(url);

            return {
                success: true,
                data
            };
        } catch (error: any) {
            return this.handleError('Araçlar listesi alınırken hata oluştu', error);
        }
    }

    /**
     * Creates a new vehicle
     */
    static async aracEkle(arac: AracContent): Promise<ServiceResult<AracContent>> {
        try {
            // Validate required fields
            this.validateAracForCreate(arac);

            const data = await HttpService.post<AracContent>(this.BASE_PATH, arac);

            return {
                success: true,
                data
            };
        } catch (error: any) {
            return this.handleError('Araç eklenirken hata oluştu', error);
        }
    }

    /**
     * Updates an existing vehicle
     */
    static async aracGuncelle(arac: AracContent): Promise<ServiceResult<AracContent>> {
        try {
            // Validate required fields for update
            this.validateAracForUpdate(arac);

            const url = `${this.BASE_PATH}/${arac.id}`;
            const data = await HttpService.put<AracContent>(url, arac);

            return {
                success: true,
                data
            };
        } catch (error: any) {
            return this.handleError('Araç güncellenirken hata oluştu', error);
        }
    }

    /**
     * Deletes a vehicle by ID
     */
    static async aracSil(id: number): Promise<ServiceResult<void>> {
        try {
            // Validate ID
            this.validateId(id);

            const url = `${this.BASE_PATH}/${id}`;
            await HttpService.delete<void>(url);

            return {
                success: true
            };
        } catch (error: any) {
            return this.handleError('Araç silinirken hata oluştu', error);
        }
    }

    /**
     * Retrieves a single vehicle by ID
     */
    static async aracGetir(id: number): Promise<ServiceResult<AracContent>> {
        try {
            // Validate ID
            this.validateId(id);

            const url = `${this.BASE_PATH}/${id}`;
            const data = await HttpService.get<AracContent>(url);

            return {
                success: true,
                data
            };
        } catch (error: any) {
            return this.handleError('Araç bilgileri alınırken hata oluştu', error);
        }
    }

    /**
     * Searches vehicles by keyword
     */
    static async aracAra(keyword: string, limit?: number): Promise<ServiceResult<AracContent[]>> {
        try {
            if (!keyword || keyword.trim().length === 0) {
                throw new Error('Arama kelimesi boş olamaz');
            }

            const queryParams = new URLSearchParams({
                keyword: keyword.trim(),
                ...(limit && { limit: limit.toString() })
            });

            const url = `${this.BASE_PATH}/search?${queryParams.toString()}`;
            const data = await HttpService.get<AracContent[]>(url);

            return {
                success: true,
                data
            };
        } catch (error: any) {
            return this.handleError('Araç arama işleminde hata oluştu', error);
        }
    }

    // Private validation methods
    private static validatePageNum(pageNum: number): void {
        if (!Number.isInteger(pageNum) || pageNum < 0) {
            throw new Error('Sayfa numarası geçerli bir sayı olmalıdır (0 veya daha büyük)');
        }
    }

    private static validateId(id: number): void {
        if (!Number.isInteger(id) || id <= 0) {
            throw new Error('ID geçerli bir pozitif sayı olmalıdır');
        }
    }

    private static validateAracForCreate(arac: AracContent): void {
        if (!arac) {
            throw new Error('Araç bilgileri eksik');
        }

        // Required fields for creating a vehicle
        const requiredFields = ['plaka', 'musteriAdSoyad', 'musteriTelefon'];
        const missingFields = requiredFields.filter(field => !arac[field as keyof AracContent]);

        if (missingFields.length > 0) {
            throw new Error(`Zorunlu alanlar eksik: ${missingFields.join(', ')}`);
        }

        // Validate plaka format (basic validation)
        if (arac.plaka && !this.isValidPlaka(arac.plaka)) {
            throw new Error('Plaka formatı geçersiz');
        }

        // Validate phone number format
        if (arac.musteriTelefon && !this.isValidPhone(arac.musteriTelefon)) {
            throw new Error('Telefon numarası formatı geçersiz');
        }

        // Validate email if provided
        if (arac.musteriEmail && !this.isValidEmail(arac.musteriEmail)) {
            throw new Error('E-posta formatı geçersiz');
        }
    }

    private static validateAracForUpdate(arac: AracContent): void {
        if (!arac?.id) {
            throw new Error('Güncellenecek araç ID bilgisi eksik');
        }

        this.validateId(arac.id);
        
        // For update, we still validate provided fields but they're not all required
        if (arac.plaka && !this.isValidPlaka(arac.plaka)) {
            throw new Error('Plaka formatı geçersiz');
        }

        if (arac.musteriTelefon && !this.isValidPhone(arac.musteriTelefon)) {
            throw new Error('Telefon numarası formatı geçersiz');
        }

        if (arac.musteriEmail && !this.isValidEmail(arac.musteriEmail)) {
            throw new Error('E-posta formatı geçersiz');
        }
    }

    // Validation helper methods
    private static isValidPlaka(plaka: string): boolean {
        // Turkish license plate format: 2-3 digits, 2-3 letters, 2-4 digits
        const plakaRegex = /^(0[1-9]|[1-7][0-9]|8[01])\s?[A-Z]{1,3}\s?\d{1,4}$/;
        return plakaRegex.test(plaka.replace(/\s/g, '').toUpperCase());
    }

    private static isValidPhone(phone: string): boolean {
        // Turkish phone number format (basic validation)
        const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    private static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Error handling
    private static handleError(defaultMessage: string, error: any): ServiceResult<never> {
        console.error(`[AraclarService] ${defaultMessage}:`, error);

        const errorMessage = error?.message || error?.data?.message || defaultMessage;
        const status = error?.status || error?.response?.status;

        return {
            success: false,
            error: {
                message: errorMessage,
                status
            }
        };
    }
}

export default AraclarService;
