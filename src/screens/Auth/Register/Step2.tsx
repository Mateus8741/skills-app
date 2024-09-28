import { View } from 'react-native';

import { Box, CustomButton, Header, InfoText, TextInput } from '~/components';

export function Step2() {
  return (
    <Box scrollable>
      <Header />

      <View className="mt-10 flex-1 justify-between">
        <InfoText text="Complete suas informações" />

        <View className="gap-12">
          <TextInput label="E-mail" placeholder="Digite seu e-mail" />

          <CustomButton title="Próximo" variant="secondary" />
        </View>
      </View>
    </Box>
  );
}
