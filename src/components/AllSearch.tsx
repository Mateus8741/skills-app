import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { useGetServices } from '~/api/useCases/AppCases/useGetServices';
import { mapImageDetails } from '~/utils';

const CATEGORIES = [
  { id: 1, name: 'Limpeza', category: 'CLEANING' },
  { id: 2, name: 'Pedreiro', category: 'BRICKLAYER' },
  { id: 3, name: 'Pintura', category: 'PAINTER' },
  { id: 4, name: 'Elétrica', category: 'ELECTRICIAN' },
  { id: 5, name: 'Encanamento', category: 'PLUMBER' },
  { id: 6, name: 'Babá', category: 'BABYSITTER' },
];

export function AllSearch() {
  const navigation = useNavigation();
  const { data: services, isLoading } = useGetServices();

  function handleNavigate(item: (typeof CATEGORIES)[0]) {
    navigation.navigate('CategoryServicesScreen', {
      category: item.category,
      name: item.name,
    });
  }

  function handleSeeAll() {
    navigation.navigate('AllCategoriesScreen');
  }

  if (isLoading) {
    return (
      <View className="mt-8">
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="mt-8">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-bold text-2xl text-gray-800">Todas as categorias</Text>
        <Pressable className="px-3 py-1" onPress={handleSeeAll}>
          <Text className="font-medium text-green-600">Ver todas</Text>
        </Pressable>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        renderItem={({ item }) => (
          <Shadow distance={4} startColor="rgba(0, 0, 0, 0.02)">
            <Pressable className="mr-4 items-center" onPress={() => handleNavigate(item)}>
              <View className="rounded-2xl bg-white p-1">
                <Image
                  source={mapImageDetails[item.category] || mapImageDetails.OTHERS}
                  className="h-24 w-24 rounded-2xl"
                  resizeMode="cover"
                />
              </View>

              <Text className="mt-2 text-center text-sm font-medium text-gray-700">
                {item.name}
              </Text>

              <Text className="mt-1 text-xs text-gray-500">
                {services?.filter((service) => service.category === item.category).length || 0}{' '}
                serviços
              </Text>
            </Pressable>
          </Shadow>
        )}
      />
    </View>
  );
}
