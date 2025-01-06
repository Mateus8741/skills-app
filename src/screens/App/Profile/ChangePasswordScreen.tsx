import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { useChangePassword } from '~/api';
import { Box, CustomButton, FormPasswordInput, Header } from '~/components';
import { AppScreenProps } from '~/routes';
import { ChangePasswordData, ChangePasswordSchema } from '~/schemas';

export function ChangePasswordScreen({ navigation }: AppScreenProps<'ChangePasswordScreen'>) {
  const { changepassword, isPending } = useChangePassword(() => navigation.goBack());

  const { control, handleSubmit } = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      new_Password: '',
      confirm_Password: '',
    },
  });

  async function handleChangePassword(data: ChangePasswordData) {
    try {
      changepassword(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <Header title="Alterar senha" />

      <View className="flex-1 gap-4 p-6">
        <FormPasswordInput
          control={control}
          name="currentPassword"
          label="Senha atual"
          placeholder="Digite sua senha atual"
        />

        <FormPasswordInput
          control={control}
          name="new_Password"
          label="Nova senha"
          placeholder="Digite sua nova senha"
        />

        <FormPasswordInput
          control={control}
          name="confirm_Password"
          label="Confirmar senha"
          placeholder="Confirme sua nova senha"
        />
      </View>

      <View className="p-6">
        <CustomButton
          title="Alterar senha"
          variant="secondary"
          isLoading={isPending}
          onPress={handleSubmit(handleChangePassword)}
        />
      </View>
    </Box>
  );
}
