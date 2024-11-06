import { PlusCircle } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { AllSearch, Box, HeaderHome, MostSearch, ServiceCard } from '~/components';
import { AppTabScreenProps } from '~/routes';
import { ServiceCardProps } from '~/schemas';

export function HomeScreen({ navigation }: AppTabScreenProps<'HomeScreen'>) {
  function handleServicePress(data: ServiceCardProps) {
    navigation.navigate('ServiceDetailsScreen', data);
  }

  function handleAddService() {
    navigation.navigate('NewServiceScreen');
  }

  return (
    <>
      <HeaderHome />

      <Box notpt scrollable>
        <MostSearch />

        <AllSearch />

        <View className="mt-4 flex-row items-center justify-between border-b border-gray-200 py-3">
          <Text className="font-subtitle text-xl text-gray-900">Serviços</Text>

          <TouchableOpacity
            className="flex-row items-center gap-2 rounded-full bg-green-50 px-4 py-2 active:bg-green-100"
            activeOpacity={0.7}
            onPress={handleAddService}>
            <Text className="font-subtitle text-sm text-green-600">Adicionar serviço</Text>
            <PlusCircle size={20} color="#16a34a" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={$SERVICES}
          keyExtractor={(_, index) => String(index)}
          className="px-2"
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 150 }}
          renderItem={({ item }) => (
            <ServiceCard service={item} onPress={() => handleServicePress(item)} />
          )}
        />
      </Box>
    </>
  );
}

export const $SERVICES: ServiceCardProps[] = [
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
      latitude: -7.311111,
      longitude: -39.302222,
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
      latitude: -7.311111,
      longitude: -39.302222,
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
      latitude: -7.311111,
      longitude: -39.302222,
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
      latitude: -7.311111,
      longitude: -39.302222,
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
      latitude: -7.311111,
      longitude: -39.302222,
      serviceId: '123',
    },
    description: 'Descrição do serviço',
    category: 'OTHERS',
    createdAt: '2015-06-01T00:00:00.000Z',
  },
];
