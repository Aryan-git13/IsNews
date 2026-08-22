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
apiClient.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    let errorMessage = 'An unexpected network error occurred.';

    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      errorMessage = 'Verification request timed out. The AI consensus engine took longer than expected. Please retry.';
    } else if (error.response) {
      // Server responded with an error status code (4xx, 5xx)
      const serverMsg = error.response.data?.message || error.response.data?.error;
      if (serverMsg) {
        // Sanitize stack traces if accidentally present
        errorMessage = serverMsg.includes('at ') || serverMsg.includes('Error:')
          ? 'Server encountered an internal processing error.'
          : serverMsg;
      } else {
        errorMessage = `Server responded with status ${error.response.status}. Please try again later.`;
      }
    } else if (error.request) {
      // Request was made but no response was received (network failure)
      errorMessage = 'Network connection failed. Unable to reach backend verification services.';
    } else {
      // Error setting up the request
      errorMessage = error.message || 'Failed to send verification request.';
    }

    return Promise.reject(new Error(errorMessage));
  }
);
