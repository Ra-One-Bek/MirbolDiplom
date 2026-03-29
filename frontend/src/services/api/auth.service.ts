import { apiClient } from './client';
import { API_ENDPOINTS } from './endpoints';
import type { LoginResponse } from '../../types/auth.types';

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH_LOGIN,
      {
        username,
        password,
      }
    );

    return response.data;
  },

  async register(username: string, password: string) {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH_REGISTER,
      {
        username,
        password,
      }
    );

    return response.data;
  },
};