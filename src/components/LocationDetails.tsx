import React from 'react';
import { Text, View } from 'react-native';

import { ServiceLocation } from '~/schemas';

export function LocationDetails({
  street,
  neighborhood,
  complement,
  reference,
  number,
}: ServiceLocation) {
  return (
    <View className="mt-5 gap-1">
      <Text className="font-bold text-xl">Location</Text>
      <Text className="text-gray-500">{street || 'N/A'}</Text>
      <Text className="text-gray-500">{neighborhood || 'N/A'}</Text>
      <Text className="text-gray-500">{complement || 'N/A'}</Text>
      <Text className="text-gray-500">{reference || 'N/A'}</Text>
      <Text className="text-gray-500">{number || 'N/A'}</Text>
    </View>
  );
}
