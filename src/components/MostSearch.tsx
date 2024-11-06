import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import Jb1 from '~/assets/jobs/cleaning.png';
import Jb2 from '~/assets/jobs/electric.png';
import Jb4 from '~/assets/jobs/painting.png';
import Jb3 from '~/assets/jobs/plumber.png';

const $DATA = [
  {
    id: 1,
    name: 'Limpeza',
    image: Jb1,
    category: 'CLEANING',
  },
  {
    id: 2,
    name: 'Elétrica',
    image: Jb2,
    category: 'ELECTRICIAN',
  },
  {
    id: 3,
    name: 'Instalação de bomba',
    image: Jb3,
    category: 'PLUMBER',
  },
  {
    id: 4,
    name: 'Pintura',
    image: Jb4,
    category: 'PAINTER',
  },
];

export function MostSearch() {
  const { navigate } = useNavigation();

  function handleNavigate(data: (typeof $DATA)[0]) {
    navigate('CategoryServicesScreen', {
      category: data.category,
      name: data.name,
    });
  }

  return (
    <View className="mt-6">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-bold text-2xl text-gray-800">Mais procurados</Text>
        <Pressable className="px-3 py-1">
          <Text className="font-medium text-green-600">Ver todos</Text>
        </Pressable>
      </View>

      <FlatList
        data={$DATA}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        renderItem={({ item }) => (
          <Shadow distance={6} startColor="rgba(0, 0, 0, 0.03)">
            <Pressable
              className="mr-4 overflow-hidden rounded-2xl border border-gray-200 bg-white"
              onPress={() => handleNavigate(item)}
              style={{ width: 200 }}>
              <Image source={item.image} className="h-28 w-full rounded-t-2xl" resizeMode="cover" />

              <View className="p-3">
                <Text className="font-bold text-base text-gray-800">{item.name}</Text>
                <View className="mt-1 flex-row items-center">
                  <Text className="text-sm text-gray-500">200+ profissionais</Text>
                </View>
              </View>
            </Pressable>
          </Shadow>
        )}
      />
    </View>
  );
}
