import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin } from 'lucide-react-native';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { Box, CustomButton, FormSelect, FormTextInput, Header } from '~/components';
import { useLocationTracking } from '~/hooks';
import { createServiceSchema, CreateServiceSchema } from '~/schemas';

const categoryOptions = [
  { label: 'Limpeza', value: 'CLEANING' },
  { label: 'Eletricista', value: 'ELECTRICIAN' },
  { label: 'Encanador', value: 'PLUMBER' },
  { label: 'Pintor', value: 'PAINTER' },
  { label: 'Pedreiro', value: 'BRICKLAYER' },
  { label: 'Babá', value: 'BABYSITTER' },
  { label: 'Outros', value: 'OTHERS' },
];

export function NewServiceScreen() {
  const { location, mapRef } = useLocationTracking();

  useEffect(() => {
    setValue('location.latitude', location.latitude);
    setValue('location.longitude', location.longitude);
  }, []);

  const { control, handleSubmit, setValue, watch } = useForm<CreateServiceSchema>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'OTHERS',
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

  const latitude = watch('location.latitude');
  const longitude = watch('location.longitude');

  function handleMapPress(event: any) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setValue('location.latitude', latitude);
    setValue('location.longitude', longitude);
    console.log(latitude, longitude);
  }

  function handleCreateService(data: CreateServiceSchema) {
    console.log(data);
  }

  return (
    <Box>
      <Header title="Novo Serviço" />
      <ScrollView className="flex-grow" showsVerticalScrollIndicator={false}>
        <View className="my-6 flex-1 gap-6">
          <View className="gap-4">
            <Text className="font-bold text-xl text-black">Detalhes do Serviço</Text>

            <FormTextInput
              control={control}
              name="name"
              label="Nome do serviço"
              placeholder="Ex: Eletricista residencial"
            />

            <FormTextInput
              control={control}
              name="description"
              label="Descrição"
              placeholder="Descreva os detalhes do seu serviço"
              multiline
              numberOfLines={4}
            />

            <View className="flex-row gap-4">
              <FormSelect
                control={control}
                name="category"
                label="Categoria"
                placeholder="Selecione uma categoria"
                options={categoryOptions}
              />

              <FormTextInput
                control={control}
                name="price"
                label="Preço"
                placeholder="R$ 0,00"
                keyboardType="numeric"
                moreClassName="flex-1"
              />
            </View>
          </View>

          <View className="gap-4">
            <View className="flex-row items-center gap-2">
              <MapPin size={24} color="black" />
              <Text className="font-bold text-xl text-black">Localização</Text>
            </View>

            <View className=" overflow-hidden rounded-lg">
              <MapView
                ref={mapRef}
                initialRegion={{
                  latitude: location?.latitude || 0,
                  longitude: location?.longitude || 0,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
                style={{
                  marginTop: 10,
                  borderRadius: 20,
                  height: 250,
                }}
                onPress={handleMapPress}>
                <Marker
                  coordinate={{
                    latitude,
                    longitude,
                  }}
                  title="Sua localização"
                  description="Você está aqui"
                />
              </MapView>
            </View>

            <View className="flex-row gap-4">
              <FormTextInput
                control={control}
                name="location.street"
                label="Rua"
                placeholder="Nome da rua"
                moreClassName="flex-1"
              />

              <FormTextInput
                control={control}
                name="location.number"
                label="Número"
                placeholder="Nº"
                keyboardType="numeric"
                moreClassName="w-24"
              />
            </View>

            <View className="flex-row gap-4">
              <FormTextInput
                control={control}
                name="location.city"
                label="Cidade"
                placeholder="Sua cidade"
                moreClassName="flex-1"
              />

              <FormTextInput
                control={control}
                name="location.neighborhood"
                label="Bairro"
                placeholder="Seu bairro"
                moreClassName="flex-1"
              />
            </View>

            <View className="flex-row gap-4">
              <FormTextInput
                control={control}
                name="location.complement"
                label="Complemento"
                placeholder="Apto, Bloco, etc (opcional)"
                moreClassName="flex-1"
              />

              <FormTextInput
                control={control}
                name="location.state"
                label="Estado"
                placeholder="UF"
                moreClassName="w-24"
              />
            </View>

            <FormTextInput
              control={control}
              name="location.reference"
              label="Ponto de referência"
              placeholder="Ex: Próximo à padaria (opcional)"
            />
          </View>
        </View>
      </ScrollView>

      <View className="mt-4 bg-white">
        <CustomButton
          title="Cadastrar serviço"
          variant="secondary"
          onPress={handleSubmit(handleCreateService)}
        />
      </View>
    </Box>
  );
}
