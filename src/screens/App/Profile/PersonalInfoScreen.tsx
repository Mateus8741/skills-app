import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';

import { useUpdateUser } from '~/api';
import { Box, CustomButton, FormTextInput, Header } from '~/components';
import { useUserStorage } from '~/contexts';
import { AppScreenProps } from '~/routes';

const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phoneNumber: z.string().min(1, 'Telefone é obrigatório'),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

export function PersonalInfoScreen({ navigation }: AppScreenProps<'PersonalInfoScreen'>) {
  const { user } = useUserStorage();
  const { updateUser, isPending } = useUpdateUser();

  const { control, handleSubmit } = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user?.user.firstName || '',
      lastName: user?.user.lastName || '',
      email: user?.user.email || '',
      phoneNumber: user?.user.phoneNumber?.toString() || '',
    },
  });

  async function handleUpdateInfo(data: PersonalInfoData) {
    try {
      updateUser({
        ...user!,
        user: {
          ...user!.user,
          ...data,
        },
      });

      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box>
      <Header title="Informações Pessoais" />

      <View className="flex-1 gap-4 p-6">
        <FormTextInput
          control={control}
          name="firstName"
          label="Nome"
          placeholder="Digite seu nome"
        />

        <FormTextInput
          control={control}
          name="lastName"
          label="Sobrenome"
          placeholder="Digite seu sobrenome"
        />

        <FormTextInput
          control={control}
          name="email"
          label="E-mail"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
        />

        <FormTextInput
          control={control}
          name="phoneNumber"
          label="Telefone"
          placeholder="Digite seu telefone"
          keyboardType="phone-pad"
        />
      </View>

      <View className="p-6">
        <CustomButton
          title="Salvar alterações"
          variant="secondary"
          isLoading={isPending}
          onPress={handleSubmit(handleUpdateInfo)}
        />
      </View>
    </Box>
  );
}
