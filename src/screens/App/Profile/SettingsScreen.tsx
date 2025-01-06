import { Lock, Moon, Smartphone, Sun, Trash } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { Box, Header } from '~/components';
import { useUserStorage } from '~/contexts';
import { AppScreenProps } from '~/routes';
import { ThemeType, useThemeStore } from '~/stores/themeStore';

export function SettingsScreen({ navigation }: AppScreenProps<'SettingsScreen'>) {
  const { removeUser } = useUserStorage();
  const { theme, setTheme } = useThemeStore();

  const themeOptions: {
    icon: (color: string) => JSX.Element;
    title: string;
    value: ThemeType;
  }[] = [
    {
      icon: (color) => <Sun size={24} color={color} />,
      title: 'Tema claro',
      value: 'light',
    },
    {
      icon: (color) => <Moon size={24} color={color} />,
      title: 'Tema escuro',
      value: 'dark',
    },
    {
      icon: (color) => <Smartphone size={24} color={color} />,
      title: 'Tema do sistema',
      value: 'system',
    },
  ];

  const settingsItems = [
    {
      icon: <Lock size={24} color="#374151" />,
      title: 'Alterar senha',
      onPress: () => navigation.navigate('ChangePasswordScreen'),
    },
  ];

  return (
    <Box>
      <Header title="Configurações" />

      <View className="flex-1 gap-4 p-6">
        {settingsItems.map((item, index) => (
          <Pressable
            key={index}
            className="flex-row items-center gap-4 rounded-xl border border-gray-100 bg-white p-4 active:opacity-70"
            onPress={item.onPress}>
            {item.icon}
            <Text className="text-base font-medium text-gray-700">{item.title}</Text>
          </Pressable>
        ))}

        <View className="gap-2">
          <Text className="text-base font-medium text-gray-700">Tema</Text>
          {themeOptions.map((item, index) => (
            <Pressable
              key={index}
              className={`flex-row items-center gap-4 rounded-xl border ${
                theme === item.value ? 'border-green-500 bg-green-50' : 'border-gray-100 bg-white'
              } p-4 active:opacity-70`}
              onPress={() => setTheme(item.value)}>
              {item.icon(theme === item.value ? '#22C55E' : '#374151')}
              <Text
                className={`text-base font-medium ${
                  theme === item.value ? 'text-green-600' : 'text-gray-700'
                }`}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
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
