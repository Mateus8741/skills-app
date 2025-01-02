import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { useGetServices } from '~/api/useCases/AppCases/useGetServices';
import { ServiceCardProps } from '~/models';
import { mapImageDetails } from '~/utils';

export function MostSearch() {
  const { navigate } = useNavigation();
  const { data: services, isLoading } = useGetServices();

  // Filtra os serviços mais recentes (limitado a 4)
  const mostRecentServices = services
    ?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  function handleNavigate(service: ServiceCardProps) {
    navigate('ServiceDetailsScreen', service);
  }

  if (isLoading) {
    return (
      <View className="mt-6">
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="mt-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-bold text-2xl text-gray-800">Destaques</Text>
      </View>

      <FlatList
        data={mostRecentServices}
        keyExtractor={(item) => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        renderItem={({ item }) => (
          <Shadow distance={6} startColor="rgba(0, 0, 0, 0.03)">
            <Pressable
              className="mr-4 overflow-hidden rounded-2xl border border-gray-200 bg-white"
              onPress={() => handleNavigate(item)}
              style={{ width: 200 }}>
              <Image
                source={mapImageDetails[item.category] || mapImageDetails.OTHERS}
                className="h-28 w-full rounded-t-2xl"
                resizeMode="cover"
              />

              <View className="p-3">
                <Text className="font-bold text-base text-gray-800">{item.name}</Text>
                <View className="mt-1 flex-row items-center justify-between">
                  <Text className="text-sm text-gray-500">
                    {item.price ? `R$ ${item.price}` : 'Preço a combinar'}
                  </Text>
                  {item.rating && <Text className="text-sm text-gray-500">{item.rating} ⭐</Text>}
                </View>
              </View>
            </Pressable>
          </Shadow>
        )}
      />
    </View>
  );
}
