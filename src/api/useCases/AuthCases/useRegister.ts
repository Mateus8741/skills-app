import { useMutation } from '@tanstack/react-query';

import { register } from '~/api/apiConfig';
import { StepsScheema } from '~/schemas';

export function useRegister(onSuccess?: () => void) {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (data: StepsScheema) => register(data),
    onSuccess,
  });

  return { register: mutate, isSuccess, isPending };
}
