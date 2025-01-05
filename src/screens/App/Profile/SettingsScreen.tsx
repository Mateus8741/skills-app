import { Lock, Moon, Trash } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Box, Header } from '~/components';
import { useUserStorage } from '~/contexts';
import { AppScreenProps } from '~/routes';

export function SettingsScreen({ navigation }: AppScreenProps<'SettingsScreen'>) {
  const { removeUser } = useUserStorage();

  const settingsItems = [
    {
      icon: <Lock size={24} color="#374151" />,
      title: 'Alterar senha',
      onPress: () => navigation.navigate('ChangePasswordScreen'),
    },
    {
      icon: <Moon size={24} color="#374151" />,
      title: 'Tema escuro',
      onPress: () => console.log('Tema escuro'),
      disabled: true,
    },
  ];

  return (
    <Box>
      <Header title="Configurações" />

      <View className="flex-1 gap-4 p-6">
        {settingsItems.map((item, index) => (
          <Pressable
            key={index}
            className={`flex-row items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 ${
              item.disabled ? 'opacity-50' : 'active:opacity-70'
            }`}
            onPress={item.onPress}
            disabled={item.disabled}>
            {item.icon}
            <Text className="text-base font-medium text-gray-700">{item.title}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        className="mb-6 flex-row items-center gap-4 rounded-xl border border-red-100 bg-white p-4 active:opacity-70"
        onPress={removeUser}>
        <Trash size={24} color="#DC2626" />
        <Text className="text-base font-medium text-red-600">Excluir conta</Text>
      </Pressable>
    </Box>
  );
}
