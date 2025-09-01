export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'worker';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Errand {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  workerId?: string;
  workerName?: string;
  status: 'waiting' | 'in_progress' | 'completed' | 'cancelled';
  fee: number;
  location: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  totalErrands: number;
  inProgressErrands: number;
  completedErrands: number;
  totalRevenue: number;
  userGrowth: number;
  errandGrowth: number;
  revenueGrowth: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}