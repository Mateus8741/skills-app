import { useMutation } from '@tanstack/react-query';

import { register } from '~/api/apiConfig';
import { RegisterScheema } from '~/schemas';

export function useRegister(onSuccess?: () => void) {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (data: RegisterScheema) => register(data),
    onSuccess,
    onError: (error) => console.log(error),
  });

  return { register: mutate, isSuccess, isPending };
}
