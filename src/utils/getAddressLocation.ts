import { reverseGeocodeAsync } from 'expo-location';

import { MapScreenProps } from '~/hooks';

export async function getAddressLocation({ latitude, longitude }: MapScreenProps) {
  try {
    const addressResponse = await reverseGeocodeAsync({ latitude, longitude });

    if (addressResponse.length > 0) {
      const { street } = addressResponse[0];
      return {
        street,
      };
    }

    return {
      street: '',
    };
  } catch (error) {
    console.log('Error getAddressLocation', error);
  }
}
