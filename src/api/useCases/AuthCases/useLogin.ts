import { useMutation } from '@tanstack/react-query';

import { login, setAuthToken } from '~/api/apiConfig';
import { LoginScheema } from '~/schemas';

export function useLogin(onSuccess?: () => void) {
  //   const { setUser } = useUserStorage();

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (data: LoginScheema) => login(data),
    onSuccess,
    onSettled(data, error, variables, context) {
      const token = data?.data.token;
      if (error) {
        console.error(error);
      }

      if (token) {
        setAuthToken(token);
      }

      //   setUser({
      //     token: data?.data.token,
      //     email: data?.data.email,
      //   });
    },
  });

  return { login: mutate, isSuccess, isPending };
}
