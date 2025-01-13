import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Moon, Smartphone, Sun, Trash } from 'lucide-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Pressable, Text, View } from 'react-native';
import { z } from 'zod';

import { useDeleteAccount } from '~/api';
import { Box, CustomButton, FormPasswordInput, Header } from '~/components';
import { useUserStorage } from '~/contexts';
import { AppScreenProps } from '~/routes';
import { ThemeType, useThemeStorage } from '~/stores';

const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Senha é obrigatória'),
});

type DeleteAccountData = z.infer<typeof deleteAccountSchema>;

export function SettingsScreen({ navigation }: AppScreenProps<'SettingsScreen'>) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { removeUser } = useUserStorage();
  const { exclude, isPending } = useDeleteAccount(() => {
    removeUser();
    setIsModalVisible(false);
  });
  const { theme, setTheme } = useThemeStorage();

  const { control, handleSubmit, reset } = useForm<DeleteAccountData>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: '',
    },
  });

  const handleExcludeAccount = (data: DeleteAccountData) => {
    exclude(data.password);
  };

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

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => {
          setIsModalVisible(false);
          reset();
        }}>
        <View className="flex-1 justify-center bg-black/50 p-6">
          <View className="rounded-2xl bg-white p-6">
            <Text className="text-center font-bold text-xl text-gray-900">Excluir conta</Text>

            <Text className="mt-2 text-center text-base text-gray-600">
              Esta ação não pode ser desfeita. Todos os seus dados serão perdidos permanentemente.
            </Text>

            <View className="mt-6">
              <FormPasswordInput
                control={control}
                name="password"
                label="Digite sua senha para confirmar"
                placeholder="Sua senha"
              />
            </View>

            <View className="mt-6 gap-2">
              <CustomButton
                title="Excluir minha conta"
                variant="danger"
                isLoading={isPending}
                onPress={handleSubmit(handleExcludeAccount)}
              />

              <CustomButton
                title="Cancelar"
                variant="ghostGreen"
                onPress={() => {
                  setIsModalVisible(false);
                  reset();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </Box>
  );
}
