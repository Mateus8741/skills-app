/* eslint-disable prettier/prettier */
import {
    getCurrentPositionAsync,
    LocationAccuracy,
    LocationObjectCoords,
    watchPositionAsync,
} from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import MapView from 'react-native-maps';

export interface MapScreenProps {
    location: Pick<LocationObjectCoords, 'latitude' | 'longitude'>;
  }

export function useLocationTracking() {
  const [location, setLocation] = useState<MapScreenProps['location']>({
    latitude: 0,
    longitude: 0,
  });

  const mapRef = useRef<MapView>(null);

  async function getPosition() {
    const { coords } = await getCurrentPositionAsync();
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
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

  return { location, mapRef };
}
