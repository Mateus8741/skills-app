import { useNavigation } from '@react-navigation/native';
import { FlatList, Image, Pressable, Text, View } from 'react-native';

import img6 from '~/assets/jobs/allJobs/babySitting.png';
import img2 from '~/assets/jobs/allJobs/bricklayer.png';
import img4 from '~/assets/jobs/allJobs/cleaning.png';
import img5 from '~/assets/jobs/allJobs/electricalHelp.png';
import img3 from '~/assets/jobs/allJobs/painting.png';
import img1 from '~/assets/jobs/allJobs/plumbing.png';

export const $DATA = [
  {
    id: 1,
    name: 'Limpeza',
    image: img4,
    category: 'CLEANING'
  },
  {
    id: 2,
    name: 'Pedreiro',
    image: img2,
    category: 'BRICKLAYER'
  },
  {
    id: 3,
    name: 'Pintura',
    image: img3,
    category: 'PAINTER'
  },
  {
    id: 4,
    name: 'Elétrica',
    image: img5,
    category: 'ELECTRICIAN'
  },
  {
    id: 5,
    name: 'Encanamento',
    image: img1,
    category: 'PLUMBER'
  },
  {
    id: 6,
    name: 'Babá',
    image: img6,
    category: 'BABYSITTER'
  },
];

export function AllSearch() {
  const navigation = useNavigation();

  function handleNavigate(data: (typeof $DATA)[0]) {
    navigation.navigate('CategoryServicesScreen', {
      category: data.category,
      name: data.name,
    });
  }

  function handleSeeAll() {
    navigation.navigate('AllCategoriesScreen'); // Nova tela para ver todas as categorias
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
        data={$DATA}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        renderItem={({ item }) => (
          <Pressable 
            className="mr-4 items-center" 
            onPress={() => handleNavigate(item)}
          >
            <View className="rounded-2xl bg-white p-1 shadow-sm">
              <Image 
                source={item.image} 
                className="h-24 w-24 rounded-2xl" 
                resizeMode="cover" 
              />
            </View>

            <Text className="mt-2 text-center text-sm font-medium text-gray-700">
              {item.name}
            </Text>

            <Text className="mt-1 text-xs text-gray-500">
              {Math.floor(Math.random() * 100) + 50} serviços
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
