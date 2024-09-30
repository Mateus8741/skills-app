import {
    getCurrentPositionAsync,
    LocationAccuracy,
    LocationObjectCoords,
    watchPositionAsync,
} from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { MarkerAnimated } from 'react-native-maps';

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
    async function subscribeToLocationUpdates() {
      const subscription = await watchPositionAsync(
        { accuracy: LocationAccuracy.Highest, timeInterval: 1000, distanceInterval: 1 },
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
      return subscription;
    }

    const subscriptionPromise = subscribeToLocationUpdates();

    return () => {
      subscriptionPromise.then((subscription) => subscription.remove());
    };
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
        <CustomButton title="Confirmar localização" onPress={() => {}} variant="ghostGreen" />
      </View>
    </Box>
  );
}
