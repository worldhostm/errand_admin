import { apiClient } from '@/lib/api';
import { ApiResponse, Errand } from '@/types';

export const errandService = {
  async getAllErrands(): Promise<Errand[]> {
    const response = await apiClient.get<ApiResponse<Errand[]>>('/errands');
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch errands');
    }
    return response.data!;
  },

  async getErrandById(id: string): Promise<Errand> {
    const response = await apiClient.get<ApiResponse<Errand>>(`/errands/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch errand');
    }
    return response.data!;
  },

  async createErrand(errandData: Omit<Errand, 'id' | 'createdAt' | 'updatedAt'>): Promise<Errand> {
    const response = await apiClient.post<ApiResponse<Errand>>('/errands', errandData);
    if (!response.success) {
      throw new Error(response.error || 'Failed to create errand');
    }
    return response.data!;
  },

  async updateErrand(id: string, errandData: Partial<Errand>): Promise<Errand> {
    const response = await apiClient.put<ApiResponse<Errand>>(`/errands/${id}`, errandData);
    if (!response.success) {
      throw new Error(response.error || 'Failed to update errand');
    }
    return response.data!;
  },

  async deleteErrand(id: string): Promise<void> {
    const response = await apiClient.delete<ApiResponse>(`/errands/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete errand');
    }
  },
};