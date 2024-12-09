export interface ApplicationProps {
  id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  message?: string;
  candidate: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    rating: number;
    isAuthenticated: boolean;
    location: Location;
  };
  service: {
    name: string;
    description: string;
    price: number;
    category: string;
    rating: number;
    location: Location;
  };
}
