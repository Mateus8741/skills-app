import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import MapView from 'react-native-maps';

import { useLogin, useRegister } from '~/api';
import { Box, CustomButton, FormTextInput, Header } from '~/components';
import { AuthScreenProps } from '~/routes';
import { LocationScheema, locationScheema } from '~/schemas';
import { getAddressLocation } from '~/utils';

export function ConfirmLocation({ navigation, route }: AuthScreenProps<'ConfirmLocation'>) {
  const { location, userData } = route.params;

  const { login } = useLogin();

  const { register, isPending } = useRegister(() =>
    login({
      email: userData.email,
      password: userData.password,
    })
  );

  const [address, setAddress] = useState<string>('');

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm<LocationScheema>({
    resolver: zodResolver(locationScheema),

    defaultValues: {
      street: '',
      neighborhood: '',
      houseNumber: 0,
      reference: '',
      complement: '',
    },

    values: {
      street: address,
      neighborhood: '',
      houseNumber: 0,
      reference: '',
      complement: '',
    },

    mode: 'onChange',
  });

  getAddressLocation(location).then((data) => {
    setAddress(data?.street ?? '');
  });

  function onSubmit(data: LocationScheema) {
    reset();

    register({
      ...userData,
      isAuthenticated: false,
      location: data,
    });
  }

  return (
    <Box scrollable>
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
        isLoading={isPending}
        isDisabled={!isDirty || !isValid}
        variant="secondary"
        title="Confirmar"
        onPress={handleSubmit(onSubmit)}
      />
    </Box>
  );
}
