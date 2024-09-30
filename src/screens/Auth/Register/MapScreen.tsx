import {
    getCurrentPositionAsync,
    LocationAccuracy,
    LocationObjectCoords,
    watchPositionAsync,
} from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

import { Box, CustomButton } from '~/components';

export function MapScreen() {
  const [location, setLocation] = useState<LocationObjectCoords>();
  const [markerLocation, setMarkerLocation] = useState<LocationObjectCoords>();

  const mapRef = useRef<MapView>(null);

  async function getPosition() {
    const { coords } = await getCurrentPositionAsync();
    setLocation(coords);
    setMarkerLocation(coords);
  }

  function handleMapPress(event: any) {
    const { coordinate } = event.nativeEvent;
    setMarkerLocation(coordinate);
  }

  function handleRegionChange(region: Region) {
    setMarkerLocation({
      latitude: region.latitude,
      longitude: region.longitude,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    });
  }

  function handleRegionChangeComplete(region: Region) {
    setMarkerLocation({
      latitude: region.latitude,
      longitude: region.longitude,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    });
  }

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    async function subscribeToLocationUpdates() {
      const subscription = await watchPositionAsync(
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
        onPress={handleMapPress} // Captura cliques no mapa
        onRegionChange={handleRegionChange}
        onRegionChangeComplete={handleRegionChangeComplete} // Captura quando o mapa é arrastado
        style={{ flex: 1, marginHorizontal: -20 }}>
        {markerLocation && (
          <Marker
            coordinate={{
              latitude: markerLocation.latitude,
              longitude: markerLocation.longitude,
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
