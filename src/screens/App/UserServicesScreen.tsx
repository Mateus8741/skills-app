import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text } from 'react-native';

import { useGetApplications } from '~/api';
import { Box, ServiceCard } from '~/components';
import { useUserStorage } from '~/contexts';
import { ServiceCardProps } from '~/models';

export function UserServicesScreen() {
  const { user } = useUserStorage();
  const { data: services, isLoading } = useGetApplications(user?.user.id || '');
  const navigation = useNavigation();

  function handleServicePress(service: ServiceCardProps) {
    navigation.navigate('ServiceDetailsScreen', { id: service.id });
  }

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Box>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ServiceCard service={item} onPress={() => handleServicePress(item)} />
        )}
        ListEmptyComponent={<Text>Nenhuma publicação encontrada.</Text>}
      />
    </Box>
  );
}
