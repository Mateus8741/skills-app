import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Text, View } from 'react-native';

import { Box, FormTextInput } from '~/components';
import { createServiceSchema, CreateServiceSchema } from '~/schemas';

export function NewServiceScreen() {
  const { control, handleSubmit } = useForm<CreateServiceSchema>({
    resolver: zodResolver(createServiceSchema),

    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: 0,
      location: {
        city: '',
        state: '',
        street: '',
        neighborhood: '',
        complement: '',
        reference: '',
        number: 0,
        latitude: 0,
        longitude: 0,
      },
    },
  });

  return (
    <Box scrollable>
      <View className="gap-4">
        <Text className="mb-4 font-bold text-2xl">Cadastre um novo serviço</Text>

        <FormTextInput control={control} name="name" label="Nome" />

        <FormTextInput control={control} name="description" label="Descrição" />

        <View className="mb-6 flex-row gap-4">
          <FormTextInput
            control={control}
            name="category"
            label="Categoria"
            moreClassName="flex-1"
          />

          <FormTextInput control={control} name="price" label="Preço" moreClassName="flex-1" />
        </View>
      </View>

      <View className="gap-4">
        <Text className="mb-4 font-bold text-2xl">Cadastre um novo serviço</Text>

        <FormTextInput control={control} name="location.city" label="Cidade" />

        <FormTextInput control={control} name="location.state" label="Estado" />

        <FormTextInput control={control} name="location.street" label="Rua" />

        <FormTextInput control={control} name="location.neighborhood" label="Bairro" />

        <FormTextInput control={control} name="location.complement" label="Complemento" />

        <FormTextInput control={control} name="location.reference" label="Referência" />

        <View className="mb-6 flex-row gap-4">
          <FormTextInput
            control={control}
            name="location.number"
            label="Número"
            moreClassName="flex-1"
          />

          <FormTextInput
            control={control}
            name="location.latitude"
            label="Latitude"
            moreClassName="flex-1"
          />

          <FormTextInput
            control={control}
            name="location.latitude"
            label="Latitude"
            moreClassName="flex-1"
          />

          <FormTextInput
            control={control}
            name="location.longitude"
            label="Longitude"
            moreClassName="flex-1"
          />
        </View>
      </View>
    </Box>
  );
}
