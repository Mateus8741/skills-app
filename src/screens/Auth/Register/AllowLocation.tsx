import { requestForegroundPermissionsAsync } from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

import LocationIMG from '~/assets/AllowLocation.png';
import BGImg from '~/assets/BGImage.png';
import { CustomButton } from '~/components';
import { AuthScreenProps } from '~/routes';

export function AllowLocation({ navigation }: AuthScreenProps<'AllowLocation'>) {
  async function watchIsLocationPermitted() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      navigation.push('MapScreen');
    }
  }

  useEffect(() => {
    navigation.addListener('focus', watchIsLocationPermitted);

    return () => {
      navigation.removeListener('focus', watchIsLocationPermitted);
    };
  }, []);

  return (
    <ImageBackground source={BGImg} className="flex-1 items-center justify-center bg-white">
      <StatusBar hidden />
      <Image source={LocationIMG} className="h-64 w-64" />

      <Text className="mt-4 text-center font-bold text-3xl text-black">Permitir localização</Text>

      <Text className="mt-4 max-w-xs text-center text-lg font-semibold text-gray-500">
        Habilite a localização para encontrar um profissional perto de você
      </Text>

      <View className="w-full p-5">
        <CustomButton
          title="Permitir localização"
          variant="ghostGreen"
          onPress={watchIsLocationPermitted}
        />
      </View>
    </ImageBackground>
  );
}
