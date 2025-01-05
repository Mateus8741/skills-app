import { Alert, Linking, Platform } from 'react-native';
import { z } from 'zod';

import { api } from '~/api';
import { ServiceCardProps } from '~/models';

const reportSchema = z.object({
  serviceId: z.string(),
  reason: z.string().min(10, 'A razão deve ter pelo menos 10 caracteres'),
  description: z.string().min(20, 'A descrição deve ter pelo menos 20 caracteres'),
});

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
      case 'report': {
        Alert.prompt(
          'Reportar Problema',
          'Qual o motivo da denúncia?',
          async (reason) => {
            if (!reason || reason.length < 10) {
              return Alert.alert('Erro', 'A razão da denúncia deve ter pelo menos 10 caracteres');
            }

            Alert.prompt(
              'Descrição',
              'Descreva o problema em detalhes',
              async (description) => {
                if (!description || description.length < 20) {
                  return Alert.alert('Erro', 'A descrição deve ter pelo menos 20 caracteres');
                }

                try {
                  const data = reportSchema.parse({
                    serviceId: location.serviceId,
                    reason,
                    description,
                  });

                  await api.post('/services/report', data);

                  Alert.alert(
                    'Sucesso',
                    'Sua denúncia foi enviada e será analisada pela nossa equipe'
                  );
                } catch {
                  Alert.alert('Erro', 'Não foi possível enviar a denúncia. Tente novamente.');
                }
              },
              'plain-text',
              ''
            );
          },
          'plain-text',
          ''
        );
        break;
      }

      default:
        Alert.alert('Ação desconhecida');
    }
  };

  return { handlePress };
}
