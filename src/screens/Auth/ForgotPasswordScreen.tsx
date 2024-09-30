import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Box, CustomButton, FormTextInput, Header, InfoText } from '~/components';
import { ForgotScheema, forgotScheema } from '~/schemas';

export function ForgotPasswordScreen() {
  const { control, handleSubmit, reset } = useForm<ForgotScheema>({
    resolver: zodResolver(forgotScheema),

    defaultValues: {
      email: '',
    },

    mode: 'onChange',
  });

  function handleForgotPassword(email: ForgotScheema) {
    reset();
    console.log(email);
  }

  return (
    <Box scrollable>
      <Header />

      <View className="mt-10 flex-1 justify-between">
        <InfoText text="Vamos recuperar sua senha" />

        <View className="gap-4">
          <FormTextInput
            control={control}
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
          />
        </View>

        <CustomButton
          title="Continue"
          variant="secondary"
          onPress={handleSubmit(handleForgotPassword)}
        />
      </View>
    </Box>
  );
}
