import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

/**
 * Creates an axios instance for a specific service with enhanced interceptors
 * @param {string} options - Additional interceptor options
 * @param {Object} axiosConfig - Additional axios configuration
 * @returns {Object} Configured axios instance
 */
export const createAxiosInstance = (
    options = {},
    axiosConfig = {}
) => {
    // Bagian ini mengambil URL dari file .env
    // Jika .env tidak terbaca, ia akan default ke localhost:5000
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const instance = axios.create({
        baseURL: 'https://api.cegubaya.com/api',
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
        },
        ...axiosConfig,
    });

    setupInterceptorsTo(instance, {
        disableErrorToast: true,
        ...options,
    });

    return instance;
};