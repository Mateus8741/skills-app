import { Text, View } from 'react-native';
import MapView, { MarkerAnimated } from 'react-native-maps';

import { Box, CustomButton } from '~/components';
import { useLocationTracking } from '~/hooks';
import { AuthScreenProps } from '~/routes';

export function MapScreen({ navigation }: AuthScreenProps<'MapScreen'>) {
  const { location, mapRef } = useLocationTracking();

  function handleConfirmLocation() {
    navigation.navigate('ConfirmLocation', { location });
  }

  return (
    <Box>
      <View className="bg-white p-4">
        <Text className="text-center font-subtitle text-black">Confirme sua localização atual</Text>
      </View>

      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: location?.latitude || 0,
          longitude: location?.longitude || 0,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{ flex: 1, marginHorizontal: -20 }}>
        {location && (
          <MarkerAnimated
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Sua localização"
            description="Você está aqui"
          />
        )}
      </MapView>

      <View className="mt-5">
        <CustomButton
          title="Confirmar localização"
          onPress={handleConfirmLocation}
          variant="ghostGreen"
        />
      </View>
    </Box>
  );
}
