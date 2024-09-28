import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { Box, CustomButton, FormTextInput, Header, InfoText } from '~/components';
import { AuthScreenProps } from '~/routes';
import { Step1Scheema, StepsScheema } from '~/schemas';

export function Step1({ navigation }: AuthScreenProps<'Step1'>) {
  const { control, handleSubmit, reset } = useForm<StepsScheema>({
    resolver: zodResolver(Step1Scheema),

    defaultValues: {
      email: '',
    },

    mode: 'onChange',
  });

  function handleNavigateToStep2(email: StepsScheema) {
    navigation.navigate('Step2', email);
    reset();
  }

  return (
    <Box scrollable>
      <Header />

      <View className="mt-10 flex-1 justify-between">
        <InfoText text="Cadastre-se no Skill's" />

        <View className="gap-12">
          <FormTextInput
            control={control}
            name="email"
            label="E-mail"
            placeholder="Digite seu e-mail"
          />

          <CustomButton
            title="Continue"
            variant="secondary"
            onPress={handleSubmit(handleNavigateToStep2)}
          />

          {/* <View className="flex-row items-center justify-center gap-3">
            <View className="h-px flex-1 bg-gray-300" />
            <Text className="text-center text-gray-500">ou</Text>
            <View className="h-px flex-1 bg-gray-300" />
          </View>

          <CustomButton title="Continue com WhatsApp" variant="disabled" />
          <CustomButton title="Continue com Celular" variant="disabled" /> */}
        </View>
      </View>
    </Box>
  );
}
