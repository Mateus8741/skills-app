import { useMutation } from '@tanstack/react-query';

import { login, setAuthToken } from '~/api/apiConfig';
import { useUserStorage } from '~/contexts';
import { LoginScheema } from '~/schemas';

export function useLogin() {
  const { setUser } = useUserStorage();

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

  return { login: mutate, isSuccess, isPending };
}
