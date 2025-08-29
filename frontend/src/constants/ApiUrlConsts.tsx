
// Use relative paths for production (nginx proxy) or fallback to environment variable
const getApiUrl = (path: string) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
        // Client-side production: use relative paths (nginx proxy)
        return path;
    }
    // Server-side or development: use environment variable
    return (process.env.NEXT_PUBLIC_BACKEND_API_URL || '') + path;
};

export const ApiUrlConsts = {
    ARACLAR: getApiUrl("/api/araclar/"),
    USERS: getApiUrl("/api/users"),
    SANZIMANLAR: getApiUrl("/api/parametreler/sanzimanlar"),
    MARKALAR: getApiUrl("/api/parametreler/markalar"),
    MODELLE: getApiUrl("/api/parametreler/tum-modeller"),
    MOTOR_HACIMLERI: getApiUrl("/api/parametreler/motor-hacimleri"),
    YAKIT_TURU: getApiUrl("/api/parametreler/yakit-turleri"),
    IS_EMIRLERI: getApiUrl("/api/isEmirleri/"),
    STOK_GET_BY_ID: getApiUrl("/api/stoklar/"),
    ARAC_DURUMU: getApiUrl("/api/parametreler/arac-durumlari"),
    YAPILAN_ISLEMLER: getApiUrl("/api/parametreler/yapilan-islemler"),
    ARAC_GET_BY_ID: getApiUrl("/api/araclar/"),
    AUTH_SIGNIN: getApiUrl("/api/auth/signin"),
}