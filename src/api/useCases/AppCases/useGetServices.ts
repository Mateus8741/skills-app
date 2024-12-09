import { useQuery } from '@tanstack/react-query';

import { api } from '~/api/apiConfig';
import { ServiceCardProps } from '~/models';

export function useGetServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get<ServiceCardProps[]>('/service');
      return response.data;
    },
    // staleTime: 1000 * 60,
    retry: 2,
  });
}
