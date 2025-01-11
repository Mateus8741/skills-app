export interface ServiceSchema {
  name: string;
  description: string;
  category: string;
  price: number;
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
