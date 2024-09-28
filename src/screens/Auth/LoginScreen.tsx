import { ImageBackground, Text, View } from 'react-native';

import BGImg from '~/assets/BGImage.png';
import { CustomButton } from '~/components';

export function LoginScreen() {
  return (
    <ImageBackground source={BGImg} className="flex-1 items-center justify-center bg-green-600">
      <Text className="font-bold text-4xl text-white">SKILL'S</Text>

      <Text className="mt-4 max-w-xs text-center text-lg font-semibold text-white">
        Encontre um local profissional confiável perto de você
      </Text>

      <View className="mt-7 w-full gap-y-4 p-5">
        <CustomButton title="Entrar" />

        <CustomButton title="Entrar" />
      </View>
    </ImageBackground>
  );
}
