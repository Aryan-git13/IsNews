import { apiClient } from './apiClient';
/**
 * Service layer wrapping all backend API endpoints.
 */
export const newsService = {
    /**
     * POST /api/news/check-text
     */
    async checkText(payload) {
        return apiClient.post('/api/news/check-text', payload);
    },
    /**
     * POST /api/news/check-image
     */
    async checkImage(formData) {
        return apiClient.post('/api/news/check-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    },
    /**
     * POST /api/news/check-url
     */
    async checkUrl(payload) {
        return apiClient.post('/api/news/check-url', payload);
    },
    /**
     * GET /api/history
     */
    async getHistory() {
        return apiClient.get('/api/history');
    },
    /**
     * GET /api/history/:id
     */
    async getHistoryById(id) {
        return apiClient.get(`/api/history/${id}`);
    },
    /**
     * POST /api/feedback
     */
    async submitFeedback(payload) {
        return apiClient.post('/api/feedback', payload);
    },
    /**
     * GET /api/health
     */
    async healthCheck() {
        return apiClient.get('/api/health');
    },
};
