import {
    getCurrentPositionAsync,
    LocationAccuracy,
    LocationObjectCoords,
    watchPositionAsync,
} from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Box, CustomButton } from '~/components';

export function MapScreen() {
  const [location, setLocation] = useState<LocationObjectCoords>();

  const mapRef = useRef<MapView>(null);

  async function getPosition() {
    const { coords } = await getCurrentPositionAsync();
    setLocation(coords);
  }

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    watchPositionAsync(
      { accuracy: LocationAccuracy.Highest, timeInterval: 1000, distanceInterval: 5 },
      (location) => {
        setLocation(location.coords);
        mapRef.current?.animateCamera({
          center: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          heading: location.coords.heading || 0,
        });
      }
    );
  }, []);

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
        <Marker
          coordinate={{
            latitude: location?.latitude || 0,
            longitude: location?.longitude || 0,
          }}
          title="Sua localização"
          description="Você está aqui"
        />
      </MapView>

      <View className="mt-5">
        <CustomButton title="Confirmar localização" onPress={() => {}} variant="ghostGreen" />
      </View>
    </Box>
  );
}
