import { Building2, Info, MapPin, Navigation } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

import { ServiceLocation } from '~/schemas';

export function LocationDetails(location: ServiceLocation) {
  if (!location) return null;

  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-2">
        <Navigation size={20} color="#16a34a" />
        <Text className="font-bold text-lg text-gray-800">Localização</Text>
      </View>

      <View className="gap-3">
        <View className="flex-row gap-3">
          <MapPin size={20} color="#6b7280" className="mt-1" />
          <View className="flex-1">
            <Text className="text-gray-800">
              {location.street}, nº {location.number}
            </Text>
            <Text className="text-gray-600">{location.neighborhood}</Text>
          </View>
        </View>

        {location.complement && (
          <View className="flex-row gap-3">
            <Building2 size={20} color="#6b7280" className="mt-1" />
            <Text className="flex-1 text-gray-700">{location.complement}</Text>
          </View>
        )}

        {location.reference && (
          <View className="flex-row gap-3">
            <Info size={20} color="#6b7280" className="mt-1" />
            <Text className="flex-1 text-gray-700">{location.reference}</Text>
          </View>
        )}
      </View>
    </View>
  );
}
