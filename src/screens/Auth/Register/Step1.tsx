import { View } from 'react-native';

import { Box, CustomButton, Header, InfoTerms, InfoText, TextInput } from '~/components';

export function Step1() {
  return (
    <Box scrollable>
      <Header />

      <View className="mt-10 flex-1 justify-between">
        <InfoText text="Cadastre-se no Skill's" />

        <View className="gap-12">
          <TextInput label="E-mail" placeholder="Digite seu e-mail" />

          <CustomButton title="Continue" variant="secondary" />

          {/* <View className="flex-row items-center justify-center gap-3">
            <View className="h-px flex-1 bg-gray-300" />
            <Text className="text-center text-gray-500">ou</Text>
            <View className="h-px flex-1 bg-gray-300" />
          </View>

          <CustomButton title="Continue com WhatsApp" variant="disabled" />
          <CustomButton title="Continue com Celular" variant="disabled" /> */}
        </View>

        <InfoTerms />
      </View>
    </Box>
  );
}
