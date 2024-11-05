import { AlertTriangle, Map, MessageCircle, Phone } from 'lucide-react-native';
import { Alert, Linking, Platform, Pressable, Text, View } from 'react-native';

import { ServiceCardProps } from '~/schemas';

interface ContactDetailsProps {
  location: ServiceCardProps['location'];
  userPhoneNumber: ServiceCardProps['userPhoneNumber'];
}

export function ContactDetails({ location, userPhoneNumber }: ContactDetailsProps) {
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
    <View>
      <View className="flex-row items-center gap-2 mb-4">
        <Phone size={20} color="#16a34a" />
        <Text className="font-bold text-lg text-gray-800">Contato</Text>
      </View>

      <View className="flex-row flex-wrap justify-between gap-y-4">
        <Pressable 
          className="w-[48%] bg-white rounded-xl p-4 border border-gray-100 active:opacity-70"
          onPress={() => handlePress('call')}
        >
          <View className="items-center gap-3">
            <View className="rounded-full bg-green-100 p-3">
              <Phone size={24} color="#16a34a" />
            </View>
            <View className="items-center">
              <Text className="font-bold text-gray-800">Ligar</Text>
              <Text className="text-xs text-gray-500">Chamada direta</Text>
            </View>
          </View>
        </Pressable>

        <Pressable 
          className="w-[48%] bg-white rounded-xl p-4 border border-gray-100 active:opacity-70"
          onPress={() => handlePress('message')}
        >
          <View className="items-center gap-3">
            <View className="rounded-full bg-green-100 p-3">
              <MessageCircle size={24} color="#16a34a" />
            </View>
            <View className="items-center">
              <Text className="font-bold text-gray-800">Mensagem</Text>
              <Text className="text-xs text-gray-500">Enviar SMS</Text>
            </View>
          </View>
        </Pressable>

        <Pressable 
          className="w-[48%] bg-white rounded-xl p-4 border border-gray-100 active:opacity-70"
          onPress={() => handlePress('map')}
        >
          <View className="items-center gap-3">
            <View className="rounded-full bg-green-100 p-3">
              <Map size={24} color="#16a34a" />
            </View>
            <View className="items-center">
              <Text className="font-bold text-gray-800">Mapa</Text>
              <Text className="text-xs text-gray-500">Ver localização</Text>
            </View>
          </View>
        </Pressable>

        <Pressable 
          className="w-[48%] bg-white rounded-xl p-4 border border-gray-100 active:opacity-70"
          onPress={() => Alert.alert('Reportar', 'Deseja reportar este serviço?')}
        >
          <View className="items-center gap-3">
            <View className="rounded-full bg-red-100 p-3">
              <AlertTriangle size={24} color="#dc2626" />
            </View>
            <View className="items-center">
              <Text className="font-bold text-gray-800">Reportar</Text>
              <Text className="text-xs text-gray-500">Informar problema</Text>
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
