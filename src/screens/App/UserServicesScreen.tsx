import React from 'react';
import { FlatList, Text } from 'react-native';

import { useGetApplications } from '~/api';
import { Box, Header, Loading, ServiceCard } from '~/components';
import { ServiceCardProps } from '~/models';
import { AppScreenProps } from '~/routes';

export function UserServicesScreen({ navigation }: AppScreenProps<'UserServicesScreen'>) {
  const { data: applications, isLoading } = useGetApplications();

  function handleServicePress(service: ServiceCardProps) {
    navigation.navigate('ServiceDetailsScreen', service);
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box>
      <Header title="Meus serviços" />

      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        className="px-2"
        renderItem={({ item }) => (
          <ServiceCard service={item} onPress={() => handleServicePress(item)} />
        )}
        ListEmptyComponent={<Text>Nenhuma publicação encontrada.</Text>}
      />
    </Box>
  );
}
