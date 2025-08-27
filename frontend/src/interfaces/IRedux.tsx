
export interface IAraclarInitialState {
    
    loading: boolean;
    status: string;
    responseMessage: string;
}

// Types for API parameters and responses
export interface GetAraclarParams {
    pageNum: number;
    sortField?: string;
    sortDir?: 'asc' | 'desc';
    keyword?: string;
}

export interface ApiResponse<T> {
    data: T;
    message?: string;
    success?: boolean;
}

export interface ServiceResult<T> {
    success: boolean;
    data?: T;
    error?: {
        message: string;
        status?: number;
    };
}