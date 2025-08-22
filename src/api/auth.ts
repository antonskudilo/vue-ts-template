import api from './axios';
import { AxiosResponse } from 'axios';

export const login = async (credentials: { email: string; password: string }): Promise<AxiosResponse> => {
  return await api.post('login', credentials);
};

export const register = async (data: { email: string; password: string, password_confirmation: string }): Promise<AxiosResponse> => {
  return await api.post('register', data);
};

export const logout = async (): Promise<AxiosResponse> => {
  return await api.post('logout');
};

export const csrfCookie = async (): Promise<AxiosResponse> => {
  return await api.get('sanctum/csrf-cookie');
};

export const user = async (): Promise<AxiosResponse> => {
  return await api.get('user');
};