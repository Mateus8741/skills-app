import { Lock, Trash } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { useDeleteAccount } from '~/api';
import { Box, DeleteAccountModal, Header, themeOptions } from '~/components';
import { useUserStorage } from '~/contexts';
import { AppScreenProps } from '~/routes';
import { useThemeStorage } from '~/stores';

export function SettingsScreen({ navigation }: AppScreenProps<'SettingsScreen'>) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { removeUser } = useUserStorage();
  const { exclude, isPending } = useDeleteAccount(() => {
    removeUser();
    setIsModalVisible(false);
  });
  const { theme, setTheme } = useThemeStorage();

  const handleExcludeAccount = (password: string) => {
    exclude(password);
  };

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

      <View className="flex-1 gap-4 p-6 dark:bg-gray-900">
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
        onPress={() => setIsModalVisible(true)}>
        <Trash size={24} color="#DC2626" />
        <Text className="text-base font-medium text-red-600">Excluir conta</Text>
      </Pressable>

      <DeleteAccountModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onConfirm={handleExcludeAccount}
        isLoading={isPending}
      />
    </Box>
  );
}
