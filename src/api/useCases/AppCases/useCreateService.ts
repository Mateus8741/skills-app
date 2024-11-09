import { useMutation } from '@tanstack/react-query';

import { api, Service } from '~/api/apiConfig';

async function createServiceFn(data: Service) {
  const response = await api.post('/service', data);
  return response.data;
}

export function useCreateService() {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: createServiceFn,
    onSuccess: (data) => {
      console.log('Serviço criado:', data);
    },
    onError: (error: any) => {
      console.log('Erro ao criar serviço:', error.response?.data || error.message);
    },
  });

  return { createService: mutate, isSuccess, isPending };
}
