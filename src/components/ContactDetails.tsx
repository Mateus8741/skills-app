import { AlertTriangle, Map, MessageCircle, Phone } from 'lucide-react-native';
import { Alert, Pressable, Text, View } from 'react-native';

import { useContactActions } from '~/hooks/useContactActions';
import { ServiceCardProps } from '~/models';

interface ContactDetailsProps {
  location: ServiceCardProps['location'];
  userPhoneNumber: ServiceCardProps['userPhoneNumber'];
}

export function ContactDetails({ location, userPhoneNumber }: ContactDetailsProps) {
  const { handlePress } = useContactActions({ location, userPhoneNumber });

  return (
    <View>
      <View className="mb-4 flex-row items-center gap-2">
        <Phone size={20} color="#16a34a" />
        <Text className="font-bold text-lg text-gray-800">Contato</Text>
      </View>

      <View className="flex-row flex-wrap justify-between gap-y-4">
        <Pressable
          className="w-[48%] rounded-xl border border-gray-100 bg-white p-4 active:opacity-70"
          onPress={() => handlePress('call')}>
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
          className="w-[48%] rounded-xl border border-gray-100 bg-white p-4 active:opacity-70"
          onPress={() => handlePress('message')}>
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
          className="w-[48%] rounded-xl border border-gray-100 bg-white p-4 active:opacity-70"
          onPress={() => handlePress('map')}>
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
          className="w-[48%] rounded-xl border border-gray-100 bg-white p-4 active:opacity-70"
          onPress={() => Alert.alert('Reportar', 'Deseja reportar este serviço?')}>
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
