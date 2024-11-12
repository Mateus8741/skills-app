import { useMutation } from '@tanstack/react-query';

import { login, setAuthToken } from '~/api/apiConfig';
import { useUserStorage } from '~/contexts';
import { LoginScheema } from '~/schemas';
import { removeTokens } from '~/services/auth';

export function useAuth() {
  const { setUser, removeUser } = useUserStorage();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (data: LoginScheema) => login(data),
    onSuccess: (data) => {
      const token = data?.data.token;
      setUser(data.data);

      if (token) {
        setAuthToken(token);
      }
    },
  });

  const logout = async () => {
    try {
      await removeTokens();
      removeUser();
      setAuthToken('');

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
