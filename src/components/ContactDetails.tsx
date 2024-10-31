import { AlertTriangle, Map, MessageCircle, Phone } from 'lucide-react-native';
import { Alert, Linking, Platform, Pressable, Text, View } from 'react-native';

import { ServiceCardProps } from '~/schemas';

interface ContactDetailsProps {
  location: ServiceCardProps['location'];
  userPhoneNumber: ServiceCardProps['userPhoneNumber'];
}

export function ContactDetails({ location, userPhoneNumber }: ContactDetailsProps) {
  // console.log(location, userPhoneNumber);

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

  return (
    <View className="mt-12 flex-row gap-4">
      <Pressable className="items-center gap-2" onPress={() => handlePress('call')}>
        <View className="rounded-full bg-green-200 px-5 py-2">
          <Phone size={24} color="green" fill="green" />
        </View>
        <Text className="font-heading text-base text-green-600">Ligar</Text>
      </Pressable>

      <Pressable className="items-center gap-2" onPress={() => handlePress('message')}>
        <View className="rounded-full bg-green-200 px-5 py-2">
          <MessageCircle size={24} color="green" fill="green" />
        </View>
        <Text className="font-heading text-base text-green-600">Mensagem</Text>
      </Pressable>

      <Pressable className="items-center gap-2" onPress={() => handlePress('map')}>
        <View className="rounded-full bg-green-200 px-5 py-2">
          <Map size={24} color="green" fill="green" />
        </View>
        <Text className="font-heading text-base text-green-600">Mapa</Text>
      </Pressable>

      <Pressable className="items-center gap-2">
        <View className="rounded-full bg-red-200 px-5 py-2">
          <AlertTriangle size={24} color="red" fill="red" />
        </View>

        <Text className="font-heading text-base text-red-600">Reportar</Text>
      </Pressable>
    </View>
  );
}
