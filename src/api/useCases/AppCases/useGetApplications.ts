import { useQuery } from '@tanstack/react-query';

import { api } from '~/api/apiConfig';

export function useGetApplications() {
  return useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const response = await api.get('/applications');
      return response.data;
    },
    staleTime: 1000 * 60,
  });
}
