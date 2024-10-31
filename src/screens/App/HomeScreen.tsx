import { FlatList } from 'react-native-gesture-handler';

import { AllSearch, Box, HeaderHome, MostSearch, ServiceCard } from '~/components';
import { AppTabScreenProps } from '~/routes';
import { ServiceCardProps } from '~/schemas';

export function HomeScreen({ navigation }: AppTabScreenProps<'HomeScreen'>) {
  function handleServicePress(data: ServiceCardProps) {
    navigation.navigate('ServiceDetailsScreen', data);
  }

  return (
    <>
      <Box notpt>
        <HeaderHome />

        <MostSearch />

        <AllSearch />

        <FlatList
          data={$SERVICES}
          keyExtractor={(_, index) => String(index)}
          className="mt-4 px-2"
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => (
            <ServiceCard service={item} onPress={() => handleServicePress(item)} />
          )}
        />
      </Box>
    </>
  );
}

const $SERVICES: ServiceCardProps[] = [
  {
    name: 'Eletricista',
    price: 'R$ 80,00',
    rating: 4.5,
    isAuthenticaded: true,
    userPhoneNumber: '88999999999',
    location: {
      city: 'Barbalha',
      state: 'CE',
      street: 'Rua Pinto Madeira',
      neighborhood: 'Centro',
      complement: 'complemento',
      reference: 'referencia',
      number: 340,
      id: '1',
      serviceId: '123',
    },
    description: 'Descrição do serviço',
    category: 'ELECTRICIAN',
    createdAt: new Date().toISOString(),
  },
  {
    name: 'Pintor',
    price: 'R$ 100,00',
    rating: 4.5,
    isAuthenticaded: true,
    userPhoneNumber: '88999999999',
    location: {
      city: 'Barbalha',
      state: 'CE',
      street: 'Rua dos Bobos',
      neighborhood: 'Centro',
      id: '1',
      complement: 'complemento',
      reference: 'referencia',
      number: 0,
      serviceId: '123',
    },
    description: 'Descrição do serviço',
    category: 'PAINTER',
    createdAt: '2023-01-01T00:00:00.000Z',
  },
  {
    name: 'Pedreiro',
    price: 'R$ 120,00',
    rating: 4.5,
    isAuthenticaded: true,
    userPhoneNumber: '88999999999',
    location: {
      city: 'Barbalha',
      state: 'CE',
      street: 'Rua dos Bobos',
      neighborhood: 'Centro',
      id: '1',
      complement: 'complemento',
      reference: 'referencia',
      number: 0,
      serviceId: '123',
    },
    description: 'Descrição do serviço',
    category: 'BRICKLAYER',
    createdAt: '2022-05-01T00:00:00.000Z',
  },
  {
    name: 'Jardineiro',
    price: 'R$ 80,00',
    rating: 4.5,
    isAuthenticaded: true,
    userPhoneNumber: '88999999999',
    location: {
      city: 'Barbalha',
      state: 'CE',
      street: 'Rua dos Bobos',
      neighborhood: 'Centro',
      id: '1',
      complement: 'complemento',
      reference: 'referencia',
      number: 0,
      serviceId: '123',
    },
    description: 'Descrição do serviço',
    category: 'GARDENER',
    createdAt: '2019-07-01T00:00:00.000Z',
  },
  {
    name: 'Outros',
    price: 'R$ 80,00',
    rating: 4.5,
    isAuthenticaded: true,
    userPhoneNumber: '88999999999',
    location: {
      city: 'Barbalha',
      state: 'CE',
      street: 'Rua dos Bobos',
      neighborhood: 'Centro',
      id: '1',
      complement: 'complemento',
      reference: 'referencia',
      number: 0,
      serviceId: '123',
    },
    description: 'Descrição do serviço',
    category: 'OTHERS',
    createdAt: '2015-06-01T00:00:00.000Z',
  },
];
