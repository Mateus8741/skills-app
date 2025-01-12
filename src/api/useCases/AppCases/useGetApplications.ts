import { useQuery } from '@tanstack/react-query';

import { api } from '~/api/apiConfig';

export function useGetApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const response = await api.get('/user/services');
      return response.data;
    },
  });
}
