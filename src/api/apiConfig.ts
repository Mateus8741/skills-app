import axios from 'axios';

import { LoginScheema, StepsScheema } from '~/schemas';

export const api = axios.create({
  baseURL: 'http://localhost:3100',
});

export async function register(data: StepsScheema) {
  return await api.post('/register', data);
}

export async function login(data: LoginScheema) {
  return await api.post('/login', data);
}
