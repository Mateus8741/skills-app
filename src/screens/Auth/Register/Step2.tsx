import { View } from 'react-native';

import {
    Box,
    CustomButton,
    Header,
    InfoTerms,
    InfoText,
    PasswordInput,
    TextInput,
} from '~/components';

export function Step2() {
  return (
    <Box scrollable>
      <Header />

      <View className="mt-10 flex-1">
        <InfoText text="Complete suas informações" />

        <View className="mt-6 flex-1 gap-4">
          <TextInput label="Nome" placeholder="Digite seu nome" />
          <TextInput label="Sobrenome" placeholder="Digite seu sobrenome" />
          <TextInput label="E-mail" placeholder="Digite seu e-mail" />
          <PasswordInput label="Senha" placeholder="Digite sua senha" />
        </View>

        <View className="mb-4 rounded-md bg-gray-300 p-4">
          <InfoTerms />
        </View>

        <CustomButton title="Próximo" variant="secondary" />
      </View>
    </Box>
  );
}
