import { UserCircle } from 'lucide-react-native';
import { ImageBackground, Text, View } from 'react-native';

import HeaderBG from '~/assets/HeaderImage.png';
import { useUserStorage } from '~/contexts';
import { useAppSafeArea } from '~/hooks';

export function HeaderHome() {
  const { user } = useUserStorage();

  const { top } = useAppSafeArea();

  return (
    <ImageBackground
      className="items-start justify-between bg-green-600 px-6 py-3"
      style={{
        paddingTop: top,
      }}
      source={HeaderBG}>
      <View className="flex-row items-center gap-2">
        <UserCircle size={24} color="white" />
        <Text className="text-base font-semibold text-white">
          Bem vindo(a) {user?.user.firstName}
        </Text>
      </View>
    </ImageBackground>
  );
}
