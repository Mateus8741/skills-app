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
        contentContainerStyle={{ padding: 20 }}
        columnWrapperStyle={{ gap: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <View className="flex-1 items-center">
            <Pressable
              className="w-40 flex-1 rounded-2xl bg-white shadow-sm active:opacity-70"
              onPress={() => handleCategoryPress(item)}>
              <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                <View className="relative">
                  <Image source={item.image} className="h-32 w-full" resizeMode="cover" />
                  <View className="absolute inset-0 bg-black/5" />
                </View>

                <View className="p-4">
                  <Text className="text-center font-bold text-base text-gray-800" numberOfLines={1}>
                    {item.name}
                  </Text>

                  <View className="mt-2 flex-row items-center justify-center gap-2">
                    <View className="h-2 w-2 rounded-full bg-green-500" />
                    <Text className="text-sm text-gray-600">
                      {Math.floor(Math.random() * 100) + 50} serviços
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        )}
      />
    </Box>
  );
}
