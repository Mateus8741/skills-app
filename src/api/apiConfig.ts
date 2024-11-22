import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

import { ChangePasswordScheema, LoginScheema, StepsScheema } from '~/schemas';
import { eventEmitter, EventTypes } from '~/utils/eventEmitter';

// Constantes para storage
const ACCESS_TOKEN_KEY = '@app:accessToken';
const REFRESH_TOKEN_KEY = '@app:refreshToken';

export const api = axios.create({
  baseURL: 'http://localhost:3100',
});

// Interface para resposta do refresh token
interface RefreshTokenResponse {
  token: string;
}

// Função para armazenar tokens
async function storeTokens(accessToken: string, refreshToken?: string) {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) {
      await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
  } catch (error) {
    console.error('Erro ao armazenar tokens:', error);
  }
}

// Função para obter tokens
async function getStoredTokens() {
  try {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Erro ao obter tokens:', error);
    return { accessToken: null, refreshToken: null };
  }
}

// Função para remover tokens
async function removeTokens() {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY]);
  } catch (error) {
    console.error('Erro ao remover tokens:', error);
  }
}

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(async (config) => {
  const { accessToken } = await getStoredTokens();
  console.log('Token atual:', accessToken);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Flag para controlar refresh em andamento
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

// Função para processar fila de requisições
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token!);
    }
  });
  failedQueue = [];
};

// Interceptor para renovar token quando expirar
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    console.log('Interceptor error:', error.response?.status);
    console.log('Error details:', error.response?.data);

    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Verifica se é erro de token expirado e não é uma tentativa de refresh
    if (error.response?.status === 401 && !(originalRequest as any)._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      (originalRequest as any)._retry = true;
      isRefreshing = true;

      try {
        // Corrigido para usar a rota correta do backend
        const response = await api.post<RefreshTokenResponse>(
          '/refresh', // Alterado para corresponder à rota do backend
          {},
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const newAccessToken = response.data.token;
        console.log('Novo token obtido:', newAccessToken);

        // Armazena novo access token
        await storeTokens(newAccessToken);

        // Atualiza o token no header da requisição original
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Processa fila de requisições pendentes
        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (refreshError: any) {
        console.error('Erro no refresh token:', refreshError.response?.data || refreshError);
        processQueue(refreshError, null);
        await removeTokens();
        eventEmitter.emit(EventTypes.UNAUTHORIZED);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Se não for erro de autenticação, rejeita normalmente
    return Promise.reject(error);
  }
);

// Atualiza a configuração inicial do axios para suportar cookies
api.defaults.withCredentials = true;

// Função para configurar token inicial
export function setAuthToken(accessToken: string, refreshToken?: string) {
  return storeTokens(accessToken, refreshToken);
}

export async function register(data: StepsScheema) {
  return await api.post('/register', data);
}

export async function login(data: LoginScheema) {
  const response = await api.post('/login', data, {
    withCredentials: true,
  });

  if (response.data.accessToken) {
    await storeTokens(response.data.accessToken);
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
  }

  return response;
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
  return await api.post('/service', [data]);
}
