import { Star, Timer } from 'lucide-react-native';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { useCreateApplication } from '~/api/useCases/AppCases/useCreateApplication';
import { ContactDetails, CustomButton, Header, LocationDetails } from '~/components';
import { AppScreenProps } from '~/routes';
import { calculateInterval, formatMoney, mapImageDetails } from '~/utils';

export function ServiceDetailsScreen({ route }: AppScreenProps<'ServiceDetailsScreen'>) {
  const details = route.params;
  const { mutateAsync: createApplication, isPending } = useCreateApplication();

  const backgroundImage =
    mapImageDetails[details.category as keyof typeof mapImageDetails] || mapImageDetails.OTHERS;

  const interval = calculateInterval(new Date(details.createdAt), new Date());

  const formatedMoney = formatMoney(details.price);

  async function handleApply() {
    try {
      await createApplication({ serviceId: details.id });
      Toast.show({
        type: 'success',
        text1: 'Candidatura enviada!',
        text2: 'O prestador de serviço entrará em contato.',
        visibilityTime: 4000,
        position: 'top',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao enviar candidatura',
        text2: 'Tente novamente mais tarde.',
        visibilityTime: 4000,
        position: 'top',
      });
    }
  }

  return (
    <View className="flex-1 bg-white">
      <ImageBackground source={backgroundImage} className="h-72" imageStyle={{ opacity: 0.9 }}>
        <View className="h-full bg-black/20 pl-5 pt-14">
          <Header />
        </View>
      </ImageBackground>

      <View className="-mt-8 flex-1 rounded-t-3xl bg-white px-6">
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}>
          <View className="mt-6 gap-1">
            <View className="flex-row items-center justify-between">
              <Text className="font-bold text-2xl text-gray-800">{details.name}</Text>
              <View className="rounded-full bg-green-100 px-3 py-1">
                <Text className="font-medium text-green-700">{formatedMoney}</Text>
              </View>
            </View>

            <View className="mt-2 flex-row items-center gap-4">
              <View className="flex-row items-center gap-1">
                <Star size={16} color="#fbbf24" fill="#fbbf24" />
                <Text className="font-medium text-gray-600">{details.rating}</Text>
              </View>

              <View className="flex-row items-center gap-1">
                <Timer size={16} color="#6b7280" />
                <Text className="text-gray-600">{interval}</Text>
              </View>
            </View>
          </View>

          <View className="mt-6">
            <Text className="mb-2 font-bold text-xl text-gray-800">Descrição</Text>
            <Text className="leading-6 text-gray-600">{details.description}</Text>
          </View>

          <View className="mt-6 rounded-2xl bg-gray-50 p-4">
            <LocationDetails {...details.location} />
          </View>

          <View className="mb-6 mt-4 rounded-2xl bg-gray-50 p-4">
            <ContactDetails location={details.location} userPhoneNumber={details.userPhoneNumber} />
          </View>

          <CustomButton
            title="Candidatar-se"
            variant="secondary"
            isLoading={isPending}
            onPress={handleApply}
          />
        </ScrollView>
      </View>
    </View>
  );
}
