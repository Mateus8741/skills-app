import axios, { AxiosInstance } from 'axios';
import Toast from 'react-native-toast-message';

import { ChangePasswordData, LoginScheema, ServiceSchema, StepsScheema } from '~/schemas';
import { getStoredTokens, storeTokens } from '~/services/auth';

type PromiseType = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};

type ProcessQueueParams = {
  error: Error | null;
  token: string | null;
};

type RegisterInterceptTokenManagerProps = {
  signOut: () => void;
  refreshTokenUpdated: (newToken: string) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: ({}: RegisterInterceptTokenManagerProps) => () => void;
};

export const api = axios.create({
  baseURL: 'http://localhost:3100',
}) as APIInstanceProps;

let isRefreshing = false;
let failedQueue: PromiseType[] = [];

const processQueue = ({ error, token = null }: ProcessQueueParams): void => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });

  failedQueue = [];
};

api.registerInterceptTokenManager = ({ signOut, refreshTokenUpdated }) => {
  const interceptTokenManager = api.interceptors.response.use(
    (response) => response,
    async (requestError) => {
      if (requestError?.response?.status === 401) {
        const oldToken = await getStoredTokens();

        if (!oldToken) {
          signOut();
          return Promise.reject(requestError);
        }

        const originalRequest = requestError.config;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((error) => {
              throw error;
            });
        }

        isRefreshing = true;

        return new Promise(async (resolve, reject) => {
          try {
            console.log('Refreshing token...');
            const { data } = await api.post('/refresh', {
              token: oldToken.accessToken,
            });

            await storeTokens({ accessToken: data.token });
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            originalRequest.headers['Authorization'] = `Bearer ${data.token}`;

            refreshTokenUpdated(data.token);
            processQueue({ error: null, token: data.token });

            resolve(originalRequest);
          } catch (error: any) {
            processQueue({ error, token: null });
            signOut();

            Toast.show({
              type: 'error',
              text1: 'Sessão expirada',
              text2: 'Por favor, faça login novamente',
            });

            reject(error);
          } finally {
            isRefreshing = false;
          }
        });
      }

      return Promise.reject(requestError);
    }
  );

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export function setAuthToken(token: string) {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
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
