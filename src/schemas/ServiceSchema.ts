type ServiceCategory = 'ELECTRICIAN' | 'PLUMBER' | 'PAINTER' | 'BRICKLAYER' | 'GARDENER' | 'OTHERS';

export interface ServiceLocation {
  id: string;
  street: string;
  neighborhood: string;
  complement: string;
  reference: string;
  number: number;
  serviceId: string;
  createdAt: string;
}

export interface ServiceCardProps {
  name: string;
  description: string;
  price: string;
  category: ServiceCategory;
  rating: number;
  isAuthenticaded: boolean;
  location: ServiceLocation;
}
