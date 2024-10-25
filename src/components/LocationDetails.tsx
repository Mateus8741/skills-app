import React from 'react';
import { Text, View } from 'react-native';

import { ServiceLocation } from '~/schemas';

export function LocationDetails(location: ServiceLocation) {
  return (
    <View className="mt-5 gap-1">
      <Text className="font-bold text-xl">Location</Text>

      <Text className="text-gray-500">
        {location
          ? `${location.street} - nº ${location.number} - ${location.neighborhood} - ${location.complement} - ${location.reference}`
          : 'N/A'}
      </Text>
    </View>
  );
}
