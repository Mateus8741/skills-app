import axios from 'axios';

import { useUserStorage } from '~/contexts';
import { ChangePasswordScheema, LoginScheema, StepsScheema } from '~/schemas';

export const api = axios.create({
  baseURL: 'http://localhost:3100',
});

api.interceptors.response.use(
  (response) => response, // Retorna a resposta normalmente se não houver erro
  (error) => {
    const { removeUser } = useUserStorage();
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Desloga o usuário e limpa o estado global
      removeUser();

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export function setAuthToken(token: string) {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
}

export async function register(data: StepsScheema) {
  return await api.post('/register', data);
}

export async function login(data: LoginScheema) {
  return await api.post('/login', data);
}

export async function changePassword({ old_password, new_password }: ChangePasswordScheema) {
  return await api.patch('/changePassword', {
    old_password,
    new_password,
  });
}
