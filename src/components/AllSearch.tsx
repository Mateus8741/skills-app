import { FlatList, Image, Pressable, Text, View } from 'react-native';

import img6 from '~/assets/jobs/allJobs/babySitting.png';
import img2 from '~/assets/jobs/allJobs/carpentry.png';
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
    name: 'Marcenaria',
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
      <Text className="font-bold text-xl text-black">Todas as categorias</Text>

      <FlatList
        data={$DATA}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
        renderItem={({ item }) => (
          <Pressable className="mr-4 items-center" onPress={() => handleNavigate(item)}>
            <Image source={item.image} style={{ width: 56, height: 56 }} />

            <Text className="mt-2 font-bold text-sm text-black">{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
