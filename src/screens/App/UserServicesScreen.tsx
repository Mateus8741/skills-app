import React from 'react';
import { FlatList, Text } from 'react-native';

import { useGetApplications } from '~/api';
import { Box, ServiceCard } from '~/components';
import { ServiceCardProps } from '~/models';
import { AppTabScreenProps } from '~/routes';

export function UserServicesScreen({ navigation }: AppTabScreenProps<'ProfileScreen'>) {
  const { data: applications, isLoading } = useGetApplications();

  function handleServicePress(service: ServiceCardProps) {
    navigation.navigate('ServiceDetailsScreen', service);
  }

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  console.log('applications:', applications);

  return (
    <Box>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceCard service={item} onPress={() => handleServicePress(item)} />
        )}
        ListEmptyComponent={<Text>Nenhuma publicação encontrada.</Text>}
      />
    </Box>
  );
}
