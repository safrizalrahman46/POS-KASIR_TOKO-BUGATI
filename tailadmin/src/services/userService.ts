import api from './api';
import type { ApiResponse } from '../types/auth';

export interface UserData {
  id: number;
  username: string;
  full_name: string;
  role: 'superadmin' | 'admin' | 'kasir';
  permissions?: string;
  is_active: boolean;
  created_at: string;
}

export const userService = {
  async getUsers(page = 1, limit = 20, search = '') {
    const res = await api.get<ApiResponse<UserData[]>>('/users', { params: { page, limit, search } });
    return res.data;
  },
  async getUser(id: number) {
    const res = await api.get<ApiResponse<UserData>>(`/users/${id}`);
    return res.data;
  },
  async createUser(data: { username: string; password: string; full_name: string; role: string; permissions?: string }) {
    const res = await api.post('/users', data);
    return res.data;
  },
  async updateUser(id: number, data: { username?: string; full_name?: string; role?: string; is_active?: boolean; permissions?: string }) {
    const res = await api.put(`/users/${id}`, data);
    return res.data;
  },
  async deleteUser(id: number) {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  },
  async toggleActive(id: number) {
    const res = await api.patch(`/users/${id}/toggle-active`);
    return res.data;
  },
};
