import { useMutation } from '@tanstack/react-query';

import { createService } from '~/api/apiConfig';

export function useCreateService() {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: createService,
    onSuccess: (data) => {
      console.log('Serviço criado:', data);
    },
    onError: (error: any) => {
      console.log('Erro ao criar serviço:', error.response?.data || error.message);
      throw error;
    },
  });

  return { createService: mutate, isSuccess, isPending };
}
