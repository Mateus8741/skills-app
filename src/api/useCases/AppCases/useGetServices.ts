import { useQuery } from '@tanstack/react-query';

import { api } from '~/api/apiConfig';

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  isAuthenticaded: boolean;
  userId: string;
  userPhoneNumber: string;
  location: {
    city: string;
    state: string;
    street: string;
    neighborhood: string;
    complement: string;
    reference: string;
    number: number;
    latitude: number;
    longitude: number;
  };
}

export function useGetServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const response = await api.get<Service[]>('/service');
      return response.data;
    },
    staleTime: 1000 * 60,
    retry: 2,
  });
}
