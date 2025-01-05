import { Alert, Linking, Platform } from 'react-native';

import { ServiceCardProps } from '~/models';

interface UseContactActionsProps {
  location: ServiceCardProps['location'];
  userPhoneNumber: ServiceCardProps['userPhoneNumber'];
}

export function useContactActions({ location, userPhoneNumber }: UseContactActionsProps) {
  const handlePress = async (action: string) => {
    switch (action) {
      case 'call': {
        const phoneUrl = `tel:${userPhoneNumber}`;
        const canCall = await Linking.canOpenURL(phoneUrl);
        if (canCall) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Erro', 'Não é possível fazer a chamada');
        }
        break;
      }
      case 'message': {
        const smsUrl = `sms:${userPhoneNumber}`;
        const canMessage = await Linking.canOpenURL(smsUrl);
        if (canMessage) {
          Linking.openURL(smsUrl);
        } else {
          Alert.alert('Erro', 'Não é possível enviar a mensagem');
        }
        break;
      }
      case 'map': {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${location.latitude},${location.longitude}`;
        const label = location.street;

        const url = Platform.select({
          ios: `${scheme}${label}@${latLng}`,
          android: `${scheme}${latLng}(${label})`,
        });

        if (!url) {
          return Alert.alert('Erro', 'Não é possível abrir o mapa');
        }

        const canOpen = await Linking.canOpenURL(url);

        if (!canOpen) {
          return Alert.alert('Erro', 'Não é possível abrir o mapa');
        }

        Linking.openURL(url);
        break;
      }

      default:
        Alert.alert('Ação desconhecida');
    }
  };

  return { handlePress };
}
