import { useQuery } from '@tanstack/react-query';

import { getApplications } from '~/api/apiConfig';

export function useGetApplications(id: string) {
  return useQuery({
    queryKey: ['applications', id],
    queryFn: () => getApplications(id),
  });
}
