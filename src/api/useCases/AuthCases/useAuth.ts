import { useMutation } from '@tanstack/react-query';

import { login, setAuthToken } from '~/api/apiConfig';
import { useUserStorage } from '~/contexts';
import { LoginScheema } from '~/schemas';
import { removeTokens, storeTokens } from '~/services/auth';

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isAuthenticated: boolean;
    rating: number;
  };
}

export function useAuth() {
  const { setUser, removeUser } = useUserStorage();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: async (data: LoginScheema) => {
      try {
        const response = await login(data);

        if (!response?.data) {
          throw new Error('Resposta inválida do servidor');
        }

        return response.data as LoginResponse;
      } catch (error: any) {
        console.error('Login error details:', error.response?.data || error.message);
        throw error;
      }
    },
    onSuccess: (data) => {
      if (!data?.user?.id) {
        throw new Error('Dados do usuário inválidos');
      }
      // Armazena os tokens
      storeTokens({ accessToken: data.accessToken });

      // Configura o token para as requisições
      setAuthToken(data.accessToken);
      // Armazena os dados do usuário
      setUser({
        token: data.accessToken,
        user: {
          id: data.user.id,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phoneNumber: data.user.phoneNumber,
          isAuthenticated: data.user.isAuthenticated,
          rating: data.user.rating,
        },
      });
    },
    onError: (error: any) => {
      console.error('Login error:', error?.response?.data?.message || error.message);
      removeUser();
      removeTokens();

      // Você pode adicionar um toast ou alert aqui
      // Alert.alert('Erro', 'Credenciais inválidas');
    },
  });

  const logout = async () => {
    try {
      await removeTokens();
      removeUser();
      setAuthToken('');

      // Limpa o estado do cliente React Query
      // queryClient.clear();

      console.log('Logout success');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    login: mutate,
    logout,
    isSuccess,
    isPending,
  };
}
