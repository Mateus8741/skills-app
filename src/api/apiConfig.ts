import axios from 'axios';

import { ChangePasswordScheema, LoginScheema, StepsScheema } from '~/schemas';

export const api = axios.create({
  baseURL: 'http://localhost:3100',
});

export function setAuthToken(token: string) {
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('O TOKEN PASSOU DE BOA', token);
    return config;
  });
}

export async function register(data: StepsScheema) {
  return await api.post('/register', data);
}

export async function login(data: LoginScheema) {
  return await api.post('/login', data);
}

export async function changePassword(data: ChangePasswordScheema) {
  return await api.patch('/chanePassword', { data });
}
