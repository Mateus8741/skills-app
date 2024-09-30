import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, View } from 'react-native';

import BGImg from '~/assets/BGImage.png';
import { CustomButton } from '~/components';
import { AuthScreenProps } from '~/routes';

export function OnboardScreen({ navigation }: AuthScreenProps<'OnboardScreen'>) {
  function handleNavigateToLogin() {
    navigation.navigate('LoginScreen');
  }

  function handleNavigateToStep1() {
    navigation.navigate('Step1');
  }

  return (
    <ImageBackground source={BGImg} className="flex-1 items-center justify-center bg-green-600">
      <StatusBar hidden />
      <Text className="font-bold text-4xl text-white">SKILL'S</Text>

      <Text className="mt-4 max-w-xs text-center text-lg font-semibold text-white">
        Encontre um local profissional confiável perto de você
      </Text>

      <View className="mt-7 w-full gap-y-4 p-5">
        <CustomButton title="Cadastre-se no Skill's" onPress={handleNavigateToStep1} />

        <CustomButton title="Login" variant="ghost" onPress={handleNavigateToLogin} />
      </View>
    </ImageBackground>
  );
}
