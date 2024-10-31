type ServiceCategory = 'ELECTRICIAN' | 'PLUMBER' | 'PAINTER' | 'BRICKLAYER' | 'GARDENER' | 'OTHERS';

export interface ServiceLocation {
  id: string;
  city: string;
  state: string;
  street: string;
  neighborhood: string;
  complement: string;
  reference: string;
  number: number;
  latitude: number;
  longitude: number;
  serviceId: string;
}

export interface ServiceCardProps {
  name: string;
  description: string;
  price: string;
  category: ServiceCategory;
  userPhoneNumber: string;
  rating: number;
  isAuthenticaded: boolean;
  location: ServiceLocation;
  createdAt: string;
}
