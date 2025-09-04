import api from '../api/axios';
import type { AuthResponse } from '../types/auth';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await api.post("/auth/login", { email, password });
  return res.data; // contains { access_token }
};

export const register = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
};

