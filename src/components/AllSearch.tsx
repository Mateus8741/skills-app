import { FlatList, Image, Pressable, Text, View } from 'react-native';

import img6 from '~/assets/jobs/allJobs/babySitting.png';
import img2 from '~/assets/jobs/allJobs/bricklayer.png';
import img4 from '~/assets/jobs/allJobs/cleaning.png';
import img5 from '~/assets/jobs/allJobs/electricalHelp.png';
import img3 from '~/assets/jobs/allJobs/painting.png';
import img1 from '~/assets/jobs/allJobs/plumbing.png';

const $DATA = [
  {
    id: 1,
    name: 'Limpeza',
    image: img4,
  },
  {
    id: 2,
    name: 'Pedreiro',
    image: img2,
  },
  {
    id: 3,
    name: 'Pintura',
    image: img3,
  },
  {
    id: 4,
    name: 'Elétrica',
    image: img5,
  },
  {
    id: 5,
    name: 'Encanamento',
    image: img1,
  },
  {
    id: 6,
    name: 'Babá',
    image: img6,
  },
];

export function AllSearch() {
  function handleNavigate(data: (typeof $DATA)[0]) {
    console.log('data', data);
  }

  return (
    <View className="mt-8">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="font-bold text-2xl text-gray-800">Todas as categorias</Text>
        <Pressable className="px-3 py-1">
          <Text className="font-medium text-green-600">Ver todas</Text>
        </Pressable>
      </View>

      <FlatList
        data={$DATA}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        renderItem={({ item }) => (
          <Pressable className="mr-4 items-center" onPress={() => handleNavigate(item)}>
            <View className="rounded-2xl bg-white p-1 shadow-sm">
              <Image source={item.image} className="h-24 w-24 rounded-2xl" resizeMode="cover" />
            </View>

            <Text className="mt-2 text-center text-sm font-medium text-gray-700">{item.name}</Text>

            <Text className="mt-1 text-xs text-gray-500">
              {/* Número aleatório de serviços para exemplo */}
              {Math.floor(Math.random() * 100) + 50} serviços
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
