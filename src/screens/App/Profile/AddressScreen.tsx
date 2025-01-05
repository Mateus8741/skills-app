import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { z } from 'zod';

import { Box, CustomButton, FormTextInput, Header } from '~/components';
import { useLocationTracking } from '~/hooks';
import { AppScreenProps } from '~/routes';

const addressSchema = z.object({
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  complement: z.string().optional(),
  reference: z.string().optional(),
});

type AddressData = z.infer<typeof addressSchema>;

export function AddressScreen({ navigation }: AppScreenProps<'AddressScreen'>) {
  const { location } = useLocationTracking();

  const { control, handleSubmit } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
      reference: '',
    },
  });

  async function handleSaveAddress(data: AddressData) {
    try {
      // Implementar a chamada para salvar o endereço
      console.log(data);
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <Header title="Endereços" />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="gap-4 p-6">
          <View className="flex-row items-center gap-2">
            <MapPin size={24} color="black" />
            <Text className="font-bold text-xl text-black">Localização</Text>
          </View>

          <MapView
            initialRegion={{
              latitude: location?.latitude || 0,
              longitude: location?.longitude || 0,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            style={{
              marginTop: 10,
              borderRadius: 20,
              height: 250,
            }}>
            {location && (
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Sua localização"
                description="Você está aqui"
              />
            )}
          </MapView>

          <FormTextInput control={control} name="street" label="Rua" placeholder="Digite sua rua" />

          <View className="flex-row gap-4">
            <FormTextInput
              control={control}
              name="number"
              label="Número"
              placeholder="Nº"
              keyboardType="numeric"
              moreClassName="w-24"
            />

            <FormTextInput
              control={control}
              name="neighborhood"
              label="Bairro"
              placeholder="Digite seu bairro"
              moreClassName="flex-1"
            />
          </View>

          <FormTextInput
            control={control}
            name="complement"
            label="Complemento"
            placeholder="Digite o complemento"
          />

          <FormTextInput
            control={control}
            name="reference"
            label="Referência"
            placeholder="Digite uma referência"
          />
        </View>
      </ScrollView>

      <View className="p-6">
        <CustomButton
          title="Salvar endereço"
          variant="secondary"
          onPress={handleSubmit(handleSaveAddress)}
        />
      </View>
    </Box>
  );
}
