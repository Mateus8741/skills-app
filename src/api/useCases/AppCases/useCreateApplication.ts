import { useMutation } from '@tanstack/react-query';

import { api } from '~/api/apiConfig';

interface CreateApplicationDTO {
  serviceId: string;
}

export function useCreateApplication() {
  return useMutation({
    mutationFn: async (data: CreateApplicationDTO) => {
      const response = await api.post('/applications', data);
      return response.data;
    },
  });
}
