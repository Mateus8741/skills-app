import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import {
  Box,
  CheckForm,
  CustomButton,
  FormPasswordInput,
  FormTextInput,
  Header,
  InfoText,
} from '~/components';
import { AuthScreenProps } from '~/routes';
import { stepsScheema, StepsScheema } from '~/schemas';
import { passwordValidation } from '~/utils';

export function Step2({ navigation, route }: AuthScreenProps<'Step2'>) {
  const { email } = route.params;

  const { control, handleSubmit, reset, watch } = useForm<StepsScheema>({
    resolver: zodResolver(stepsScheema),

    defaultValues: {
      firstName: '',
      lastName: '',
      email: email || '',
      phoneNumber: 0,
      password: '',
    },

    mode: 'onChange',
  });

  const password = watch('password');

  function handleSetLocation(userData: StepsScheema) {
    navigation.navigate('AllowLocation', { userData });
    reset();
  }

  return (
    <Box scrollable>
      <Header />

      <View className="my-6 flex-1">
        <InfoText text="Complete suas informações" />

        <View className="mt-6 flex-1 gap-4">
          <FormTextInput
            control={control}
            name="firstName"
            label="Nome"
            placeholder="Digite seu nome"
          />

          <FormTextInput
            control={control}
            name="lastName"
            label="Sobrenome"
            placeholder="Digite seu sobrenome"
          />

          <FormTextInput
            control={control}
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
          />

          <FormTextInput
            control={control}
            name="phoneNumber"
            label="Celular"
            placeholder="Digite seu número"
          />

          <FormPasswordInput
            control={control}
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            errorMessage=""
          />

          <CheckForm {...passwordValidation(password)} />
        </View>
      </View>

      <CustomButton title="Próximo" variant="secondary" onPress={handleSubmit(handleSetLocation)} />
    </Box>
  );
}
