import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

import { useLogin } from '~/api';
import {
  Box,
  CustomButton,
  FormPasswordInput,
  FormTextInput,
  Header,
  InfoText,
} from '~/components';
import { AuthScreenProps } from '~/routes';
import { LoginScheema, loginScheema } from '~/schemas/LoginSchema';

export function LoginScreen({ navigation }: AuthScreenProps<'LoginScreen'>) {
  const { isPending, login } = useLogin();

  const { control, handleSubmit, reset } = useForm<LoginScheema>({
    resolver: zodResolver(loginScheema),

    defaultValues: {
      email: '',
      password: '',
    },

    mode: 'onChange',
  });

  function handleLogin(data: LoginScheema) {
    reset();
    login(data);
  }

  function handleForgotPassword() {
    navigation.navigate('ForgotPasswordScreen');
  }

  return (
    <Box scrollable>
      <Header />

      <View className="mt-10 flex-1 justify-between">
        <InfoText text="Entre no Skill's" />

        <View className="gap-4">
          <FormTextInput
            control={control}
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
          />

          <FormPasswordInput
            control={control}
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
          />

          <Pressable onPress={handleForgotPassword} className="mt-1 items-end">
            <Text className="font-bold text-lg text-green-600">Esqueceu sua senha?</Text>
          </Pressable>

          {/* <View className="flex-row items-center justify-center gap-3">
            <View className="h-px flex-1 bg-gray-300" />
            <Text className="text-center text-gray-500">ou</Text>
            <View className="h-px flex-1 bg-gray-300" />
          </View>

          <CustomButton title="Continue com WhatsApp" variant="disabled" />
          <CustomButton title="Continue com Celular" variant="disabled" /> */}
        </View>

        <CustomButton
          title="Continue"
          variant="secondary"
          isLoading={isPending}
          onPress={handleSubmit(handleLogin)}
        />
      </View>
    </Box>
  );
}
