import axios from 'axios';

import { ChangePasswordScheema, LoginScheema, StepsScheema } from '~/schemas';

export const api = axios.create({
  baseURL: 'http://localhost:3100',
});

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

export interface Service {
  name: string;
  description: string;
  category: string;
  price: number;
  location: {
    city: string;
    state: string;
    street: string;
    neighborhood: string;
    complement: string;
    reference: string;
    number: number;
    latitude: number;
    longitude: number;
  };
}

export async function createService(data: Service) {
  return await api.post('/service', data);
}
