import { apiClient } from '@/lib/api';
import { ApiResponse, User } from '@/types';

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const response = await apiClient.get<ApiResponse<User[]>>('/users');
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch users');
    }
    return response.data!;
  },

  async getUserById(id: string): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to fetch user');
    }
    return response.data!;
  },

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const response = await apiClient.post<ApiResponse<User>>('/users', userData);
    if (!response.success) {
      throw new Error(response.error || 'Failed to create user');
    }
    return response.data!;
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await apiClient.put<ApiResponse<User>>(`/users/${id}`, userData);
    if (!response.success) {
      throw new Error(response.error || 'Failed to update user');
    }
    return response.data!;
  },

  async deleteUser(id: string): Promise<void> {
    const response = await apiClient.delete<ApiResponse>(`/users/${id}`);
    if (!response.success) {
      throw new Error(response.error || 'Failed to delete user');
    }
  },
};