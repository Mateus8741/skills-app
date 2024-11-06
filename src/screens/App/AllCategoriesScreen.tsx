import { FlatList, View } from 'react-native';

import { Box, CategoryCard, Header } from '~/components';
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
          <CategoryCard
            name={item.name}
            image={item.image}
            onPress={() => handleCategoryPress(item)}
          />
        )}
      />
    </Box>
  );
}
