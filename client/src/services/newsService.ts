import { apiClient } from './apiClient';
import type { VerificationResult } from '../types/verification';

export interface TextCheckPayload {
  text: string;
}

export interface UrlCheckPayload {
  url: string;
}

export interface FeedbackPayload {
  verificationId: string;
  isAccurate: boolean;
  comment?: string;
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
  uptime?: number;
}

/**
 * Service layer wrapping all backend API endpoints.
 */
export const newsService = {
  /**
   * POST /api/news/check-text
   */
  async checkText(payload: TextCheckPayload): Promise<VerificationResult> {
    return apiClient.post<any, VerificationResult>('/api/news/check-text', payload);
  },

  /**
   * POST /api/news/check-image
   */
  async checkImage(formData: FormData): Promise<VerificationResult> {
    return apiClient.post<any, VerificationResult>('/api/news/check-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * POST /api/news/check-url
   */
  async checkUrl(payload: UrlCheckPayload): Promise<VerificationResult> {
    return apiClient.post<any, VerificationResult>('/api/news/check-url', payload);
  },

  /**
   * GET /api/history
   */
  async getHistory(): Promise<VerificationResult[]> {
    return apiClient.get<any, VerificationResult[]>('/api/history');
  },

  /**
   * GET /api/history/:id
   */
  async getHistoryById(id: string): Promise<VerificationResult> {
    return apiClient.get<any, VerificationResult>(`/api/history/${id}`);
  },

  /**
   * POST /api/feedback
   */
  async submitFeedback(payload: FeedbackPayload): Promise<{ success: boolean; message: string }> {
    return apiClient.post<any, { success: boolean; message: string }>('/api/feedback', payload);
  },

  /**
   * GET /api/health
   */
  async healthCheck(): Promise<HealthCheckResponse> {
    return apiClient.get<any, HealthCheckResponse>('/api/health');
  },
};
