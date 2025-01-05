import { AlertTriangle, Map, MessageCircle, Phone } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { ContactActionButton } from './ContactActionButton';

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
        <ContactActionButton
          icon={Phone}
          title="Ligar"
          subtitle="Chamada direta"
          onPress={() => handlePress('call')}
        />

        <ContactActionButton
          icon={MessageCircle}
          title="Mensagem"
          subtitle="Enviar SMS"
          onPress={() => handlePress('message')}
        />

        <ContactActionButton
          icon={Map}
          title="Mapa"
          subtitle="Ver localização"
          onPress={() => handlePress('map')}
        />

        <ContactActionButton
          icon={AlertTriangle}
          title="Reportar"
          subtitle="Informar problema"
          variant="danger"
          onPress={() => handlePress('report')}
        />
      </View>
    </View>
  );
}
