import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

/**
 * Creates an axios instance for a specific service with enhanced interceptors
 * @param {string} service - The service endpoint
 * @param {Object} options - Additional interceptor options
 * @param {Object} axiosConfig - Additional axios configuration
 * @returns {Object} Configured axios instance
 */
export const createAxiosInstance = (
    options = {},
    axiosConfig = {}
) => {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

    const instance = axios.create({
        baseURL: baseUrl,
        headers: {
            "Content-Type": "application/json",
        },
        ...axiosConfig,
    });

    setupInterceptorsTo(instance, {
        disableErrorToast: true,
        ...options,
    });

    return instance;
};
