import axios from 'axios';

import { ChangePasswordData, LoginScheema, ServiceSchema, StepsScheema } from '~/schemas';

export const api = axios.create({
  baseURL: 'http://localhost:3100',
});

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
