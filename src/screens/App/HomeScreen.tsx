import { FlatList } from 'react-native-gesture-handler';

import { AllSearch, Box, HeaderHome, MostSearch, ServiceCard } from '~/components';
import { AppTabScreenProps } from '~/routes';
import { ServiceCardProps } from '~/schemas';

export function HomeScreen({ navigation }: AppTabScreenProps<'HomeScreen'>) {
  function handleServicePress(data: ServiceCardProps) {
    console.log(data);
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
    location: {
      street: 'Rua dos Bobos',
      neighborhood: 'Centro',
      id: '1',
      complement: 'complemento',
      reference: 'referencia',
      number: 0,
      serviceId: '123',
      createdAt: new Date(),
    },
    description: 'Descrição do serviço',
    category: 'ELECTRICIAN',
  },
  {
    name: 'Pintor',
    price: 'R$ 100,00',
    rating: 4.5,
    isAuthenticaded: true,
    location: {
      street: 'Rua dos Bobos',
      neighborhood: 'Centro',
      id: '1',
      complement: 'complemento',
      reference: 'referencia',
      number: 0,
      serviceId: '123',
      createdAt: new Date(),
    },
    description: 'Descrição do serviço',
    category: 'PAINTER',
  },
  {
    name: 'Pedreiro',
    price: 'R$ 120,00',
    rating: 4.5,
    isAuthenticaded: true,
    location: {
      street: 'Rua dos Bobos',
      neighborhood: 'Centro',
      id: '1',
      complement: 'complemento',
      reference: 'referencia',
      number: 0,
      serviceId: '123',
      createdAt: new Date(),
    },
    description: 'Descrição do serviço',
    category: 'BRICKLAYER',
  },
  {
    name: 'Jardineiro',
    price: 'R$ 80,00',
    rating: 4.5,
    isAuthenticaded: true,
    location: {
      street: 'Rua dos Bobos',
      neighborhood: 'Centro',
      id: '1',
      complement: 'complemento',
      reference: 'referencia',
      number: 0,
      serviceId: '123',
      createdAt: new Date(),
    },
    description: 'Descrição do serviço',
    category: 'GARDENER',
  },
  {
    name: 'Outros',
    price: 'R$ 80,00',
    rating: 4.5,
    isAuthenticaded: true,
    location: {
      street: 'Rua dos Bobos',
      neighborhood: 'Centro',
      id: '1',
      complement: 'complemento',
      reference: 'referencia',
      number: 0,
      serviceId: '123',
      createdAt: new Date(),
    },
    description: 'Descrição do serviço',
    category: 'OTHERS',
  },
];
