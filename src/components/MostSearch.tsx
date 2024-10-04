import { FlatList, Image, Pressable, Text, View } from 'react-native';

import Jb1 from '~/assets/jobs/cleaning.png';
import Jb2 from '~/assets/jobs/electric.png';
import Jb3 from '~/assets/jobs/installPump.png';
import Jb4 from '~/assets/jobs/painting.png';

const $DATA = [
  {
    id: 1,
    name: 'Limpeza',
    image: Jb1,
  },
  {
    id: 2,
    name: 'Elétrica',
    image: Jb2,
  },
  {
    id: 3,
    name: 'Instalação de bomba',
    image: Jb3,
  },
  {
    id: 4,
    name: 'Pintura',
    image: Jb4,
  },
];

export function MostSearch() {
  function handleNavigate(data: (typeof $DATA)[0]) {
    console.log('data', data);
  }

  return (
    <View className="mt-4">
      <Text className="font-bold text-xl text-black">Mais procurados</Text>

      <FlatList
        data={$DATA}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-2"
        renderItem={({ item }) => (
          <Pressable className="mr-4" onPress={() => handleNavigate(item)}>
            <Image source={item.image} style={{ width: 208, height: 131 }} />

            <Text className="mt-2 font-bold text-lg text-black">{item.name}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
