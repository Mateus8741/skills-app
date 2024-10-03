import { useMutation } from '@tanstack/react-query';

import { changePassword } from '~/api/apiConfig';
import { ChangePasswordScheema } from '~/schemas';

export function useChangePassword(onSuccess?: () => void) {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (data: ChangePasswordScheema) => changePassword(data),
    onSuccess,
    onError: (error) => {
      console.log('Erro:', error.message);
    },
  });

  return { changepassword: mutate, isSuccess, isPending };
}
