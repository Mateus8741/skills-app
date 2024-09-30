import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import { Box, CustomButton, FormTextInput, Header } from '~/components';
import { AuthScreenProps } from '~/routes';
import { LocationScheema, locationScheema } from '~/schemas';

export function ConfirmLocation({ navigation, route }: AuthScreenProps<'ConfirmLocation'>) {
  const { location } = route.params;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isLoading, isValid },
  } = useForm<LocationScheema>({
    resolver: zodResolver(locationScheema),

    defaultValues: {
      street: '',
      neighborhood: '',
      houseNumber: 0,
      reference: '',
      complement: '',
    },

    mode: 'onChange',
  });

  function onSubmit(data: LocationScheema) {
    console.log(data);
  }

  return (
    <Box>
      <Header title="Confirme seu endereço" />

      <MapView
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{
          marginTop: 10,
          borderRadius: 20,
          height: 250,
        }}
      />

      <View className="mt-5 flex-1 gap-y-4">
        <FormTextInput control={control} name="street" label="Rua*" errorMessage="" />

        <View className="flex-row items-center gap-x-4">
          <FormTextInput
            control={control}
            label="Bairro*"
            name="neighborhood"
            moreClassName="flex-1"
            errorMessage=""
          />

          <FormTextInput
            control={control}
            name="houseNumber"
            label="Número*"
            keyboardType="number-pad"
            moreClassName="flex-1"
            errorMessage=""
          />
        </View>

        <FormTextInput control={control} name="complement" label="Complemento" errorMessage="" />

        <FormTextInput control={control} name="reference" label="Referência" errorMessage="" />
      </View>

      <CustomButton
        isLoading={isLoading}
        isDisabled={!isDirty || !isValid}
        variant="secondary"
        title="Confirmar"
        onPress={handleSubmit(onSubmit)}
      />
    </Box>
  );
}
