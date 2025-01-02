import { FlatList, View } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

import { useGetServices } from '~/api/useCases/AppCases/useGetServices';
import { Box, CategoryCard, Header } from '~/components';
import { AppScreenProps } from '~/routes';
import { mapImageDetails } from '~/utils';

const CATEGORIES = [
  { id: 1, name: 'Limpeza', category: 'CLEANING' },
  { id: 2, name: 'Pedreiro', category: 'BRICKLAYER' },
  { id: 3, name: 'Pintura', category: 'PAINTER' },
  { id: 4, name: 'Elétrica', category: 'ELECTRICIAN' },
  { id: 5, name: 'Encanamento', category: 'PLUMBER' },
  { id: 6, name: 'Babá', category: 'BABYSITTER' },
];

export function AllCategoriesScreen({ navigation }: AppScreenProps<'AllCategoriesScreen'>) {
  const { data: services } = useGetServices();

  function handleCategoryPress(data: typeof CATEGORIES[0]) {
    navigation.navigate('CategoryServicesScreen', {
      category: data.category,
      name: data.name,
    });
  }

  return (
    <Box>
      <Header title="Todas as categorias" />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        contentContainerStyle={{ padding: 20 }}
        columnWrapperStyle={{ gap: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        renderItem={({ item }) => (
          <Shadow distance={4} startColor="rgba(0, 0, 0, 0.02)">
            <CategoryCard
              name={item.name}
              image={mapImageDetails[item.category] || mapImageDetails.OTHERS}
              servicesCount={services?.filter((service) => service.category === item.category).length}
              onPress={() => handleCategoryPress(item)}
            />
          </Shadow>
        )}
      />
    </Box>
  );
}
