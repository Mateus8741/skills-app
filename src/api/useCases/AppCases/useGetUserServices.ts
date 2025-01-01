import { useQuery } from '@tanstack/react-query';

import { getUserServices } from '~/api/apiConfig';

export function useGetUserServices() {
  return useQuery({
    queryKey: ['userServices'],
    queryFn: async () => getUserServices(),
    staleTime: 1000 * 60, // 1 minuto
    retry: 2,
  });
}
