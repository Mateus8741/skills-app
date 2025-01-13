import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Modal, Pressable, Text, View } from 'react-native';
import { z } from 'zod';

import { CustomButton } from '../CustomButton';
import { FormPasswordInput } from '../Form/FormPasswordInput';

const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Senha é obrigatória'),
});

type DeleteAccountData = z.infer<typeof deleteAccountSchema>;

interface DeleteAccountModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isLoading?: boolean;
}

export function DeleteAccountModal({
  isVisible,
  onClose,
  onConfirm,
  isLoading,
}: DeleteAccountModalProps) {
  const { control, handleSubmit, reset } = useForm<DeleteAccountData>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      password: '',
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleConfirm = (data: DeleteAccountData) => {
    onConfirm(data.password);
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={handleClose}>
      <Pressable className="flex-1 justify-center bg-black/50 p-6" onPress={handleClose}>
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
              isLoading={isLoading}
              onPress={handleSubmit(handleConfirm)}
            />

            <CustomButton title="Cancelar" variant="ghostGreen" onPress={handleClose} />
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
