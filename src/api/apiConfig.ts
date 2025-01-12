import axios from 'axios';
import Toast from 'react-native-toast-message';

import { ChangePasswordData, LoginScheema, ServiceSchema, StepsScheema } from '~/schemas';
import { removeTokens } from '~/services/auth';

export const api = axios.create({
  baseURL: 'http://localhost:3100',
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Limpa os tokens
        await removeTokens();

        // Remove o token do header
        delete api.defaults.headers.common['Authorization'];

        Toast.show({
          type: 'error',
          text1: 'Sessão expirada',
          text2: 'Por favor, faça login novamente',
        });
      } catch (refreshError) {
        console.error('Erro ao fazer logout:', refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export function setAuthToken(token: string) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('Token set:', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('Token removed');
  }
}

export async function register(data: StepsScheema) {
  return await api.post('/register', data);
}

export async function login(data: LoginScheema) {
  const response = await api.post('/login', data, {
    withCredentials: true,
  });

  return response;
}

export async function changePassword({
  currentPassword,
  new_Password,
  confirm_Password,
}: ChangePasswordData) {
  return await api.patch('/changePassword', {
    currentPassword,
    new_Password,
    confirm_Password,
  });
}

export async function createService(data: ServiceSchema) {
  return await api.post('/service', [data]);
}

export async function getServices() {
  return await api.get('/service');
}
