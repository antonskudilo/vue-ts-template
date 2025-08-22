import axios from 'axios';
import { env } from '@/config/env';

const api = axios.create({
  baseURL: env.VITE_API_URL,
  withXSRFToken: true,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler;
}

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      if (onUnauthorized) {
        onUnauthorized();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
