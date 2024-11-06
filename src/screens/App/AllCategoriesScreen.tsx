import { FlatList, Image, Pressable, Text, View } from 'react-native';

import { Box, Header } from '~/components';
import { $DATA } from '~/components/AllSearch';
import { AppScreenProps } from '~/routes';

export function AllCategoriesScreen({ navigation }: AppScreenProps<'AllCategoriesScreen'>) {
  function handleCategoryPress(data: (typeof $DATA)[0]) {
    navigation.navigate('CategoryServicesScreen', {
      category: data.category,
      name: data.name,
    });
  }

  return (
    <Box>
      <Header title="Todas as categorias" />

      <FlatList
        data={$DATA}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ gap: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        renderItem={({ item }) => (
          <Pressable className="flex-1 items-center" onPress={() => handleCategoryPress(item)}>
            <View className="w-full rounded-2xl bg-white p-4 shadow-sm">
              <View className="items-center">
                <Image source={item.image} className="h-24 w-24 rounded-2xl" resizeMode="cover" />
              </View>

              <View className="mt-3 items-center">
                <Text className="text-center text-base font-medium text-gray-800">{item.name}</Text>
                <Text className="mt-1 text-sm text-gray-500">
                  {Math.floor(Math.random() * 100) + 50} serviços
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      />
    </Box>
  );
}
