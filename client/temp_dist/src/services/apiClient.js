import axios, { AxiosError } from 'axios';
// Base URL configured from environment variable with safe development fallback
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 second timeout for deep AI consensus verification
});
// Response & Error normalization interceptor
apiClient.interceptors.response.use((response) => response.data, (error) => {
    let errorMessage = 'An unexpected network error occurred.';
    if (error.response) {
        // Server responded with an error status code (4xx, 5xx)
        errorMessage = error.response.data?.message || error.response.data?.error || `Request failed with status ${error.response.status}`;
    }
    else if (error.request) {
        // Request was made but no response was received
        errorMessage = 'No response received from the server. Please check backend connection.';
    }
    else {
        // Error setting up the request
        errorMessage = error.message;
    }
    return Promise.reject(new Error(errorMessage));
});
