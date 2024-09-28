import { View } from 'react-native';

import { Box, CustomButton, Header, InfoText, TextInput } from '~/components';
import { AuthScreenProps } from '~/routes';

export function Step1({ navigation }: AuthScreenProps<'Step1'>) {
  function handleNavigateToStep2() {
    navigation.navigate('Step2');
  }

  return (
    <Box scrollable>
      <Header />

      <View className="mt-10 flex-1 justify-between">
        <InfoText text="Cadastre-se no Skill's" />

        <View className="gap-12">
          <TextInput label="E-mail" placeholder="Digite seu e-mail" />

          <CustomButton title="Continue" variant="secondary" onPress={handleNavigateToStep2} />

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
