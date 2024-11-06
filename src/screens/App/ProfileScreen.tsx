import { Camera, LogOut, MapPin, Settings, User2 } from 'lucide-react-native';
import { Image, Pressable, Text, View } from 'react-native';

import { Box } from '~/components';
import { useUserStorage } from '~/contexts';

export function ProfileScreen() {
  const { user } = useUserStorage();

  const menuItems = [
    {
      icon: <User2 size={24} color="#374151" />,
      title: 'Informações pessoais',
      onPress: () => console.log('Informações pessoais'),
    },
    {
      icon: <MapPin size={24} color="#374151" />,
      title: 'Endereços',
      onPress: () => console.log('Endereços'),
    },
    {
      icon: <Settings size={24} color="#374151" />,
      title: 'Configurações',
      onPress: () => console.log('Configurações'),
    },
    {
      icon: <LogOut size={24} color="#DC2626" />,
      title: 'Sair',
      //   onPress: signOut,
      danger: true,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <View className="items-center pb-6 pt-10">
        <View className="relative">
          <Image
            source={{ uri: 'https://github.com/Mateus8741.png' }}
            className="h-32 w-32 rounded-full"
          />
          <Pressable
            className="absolute bottom-0 right-0 rounded-full bg-green-600 p-2"
            onPress={() => console.log('Alterar foto')}>
            <Camera size={20} color="white" />
          </Pressable>
        </View>

        <Text className="mt-4 font-bold text-2xl text-gray-800">
          {user?.user.firstName} {user?.user.lastName}
        </Text>
        <Text className="text-gray-500">{user?.user.email}</Text>
      </View>

      {/* Menu */}
      <View className="gap-4">
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            className="flex-row items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 active:opacity-70"
            onPress={item.onPress}>
            {item.icon}
            <Text
              className={`text-base font-medium ${item.danger ? 'text-red-600' : 'text-gray-700'}`}>
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Versão */}
      <Text className="mt-6 text-center text-sm text-gray-400">Versão 1.0.0</Text>
    </Box>
  );
}
