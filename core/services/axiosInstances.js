import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

export const createAxiosInstance = (
    options = {},
    axiosConfig = {}
) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    const instance = axios.create({
        baseURL: `${baseUrl}/api`, 
        headers: {
            // HAPUS "Content-Type": "application/json", AGAR AXIOS OTOMATIS MENDETEKSI FORM DATA
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