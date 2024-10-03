import { FlatList, Image, Pressable, Text, View } from 'react-native';

import Jb1 from '~/assets/jobs/cleaning.png';
import Jb2 from '~/assets/jobs/electric.png';
import Jb3 from '~/assets/jobs/installPump.png';
import Jb4 from '~/assets/jobs/painting.png';

export function MostSearch() {
  return (
    <View className="mt-4">
      <Text className="font-bold text-xl text-black">Mais procurados</Text>

      <FlatList
        data={[Jb1, Jb2, Jb3, Jb4]}
        keyExtractor={(_, index) => String(index)}
        horizontal
        className="mt-2"
        renderItem={({ item }) => (
          <Pressable className="mr-4">
            <Image source={item} style={{ width: 208, height: 131 }} />

            {/* <Text className="mt-2 font-bold text-lg text-black">Limpeza</Text> */}
          </Pressable>
        )}
      />
    </View>
  );
}
