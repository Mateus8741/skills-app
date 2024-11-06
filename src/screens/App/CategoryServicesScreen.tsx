import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { $SERVICES } from './HomeScreen';

import { Box, Header, ServiceCard } from '~/components';
import { AppScreenProps } from '~/routes';
import { ServiceCardProps } from '~/schemas';

export function CategoryServicesScreen({
  navigation,
  route,
}: AppScreenProps<'CategoryServicesScreen'>) {
  const { category, name } = route.params;

  const filteredServices = $SERVICES.filter((service) => service.category === category);

  function handleServicePress(data: ServiceCardProps) {
    navigation.navigate('ServiceDetailsScreen', data);
  }

  return (
    <Box>
      <Header title={name} />

      <View className="flex-1 px-4">
        {filteredServices.length > 0 ? (
          <>
            <Text className="mb-4 text-base text-gray-600">
              {filteredServices.length}{' '}
              {filteredServices.length === 1 ? 'serviço encontrado' : 'serviços encontrados'}
            </Text>

            <FlatList
              data={filteredServices}
              keyExtractor={(_, index) => String(index)}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
              renderItem={({ item }) => (
                <ServiceCard service={item} onPress={() => handleServicePress(item)} />
              )}
              ItemSeparatorComponent={() => <View className="h-4" />}
            />
          </>
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-base text-gray-500">Nenhum serviço disponível para {name}</Text>
          </View>
        )}
      </View>
    </Box>
  );
}
