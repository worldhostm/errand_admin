import { apiClient } from '@/lib/api';
import { ApiResponse, DashboardStats, Errand } from '@/types';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch dashboard stats');
    }
    return response.data!;
  },

  async getRecentErrands(): Promise<Errand[]> {
    const response = await apiClient.get<ApiResponse<Errand[]>>('/dashboard/recent-errands');
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch recent errands');
    }
    return response.data!;
  },
};