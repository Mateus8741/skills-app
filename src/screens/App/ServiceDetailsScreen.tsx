import { Star, Timer } from 'lucide-react-native';
import { ImageBackground, Text, View } from 'react-native';

import { Box, ContactDetails, CustomButton, Header, LocationDetails } from '~/components';
import { AppScreenProps } from '~/routes';
import { calculateInterval, mapImageDetails } from '~/utils';

export function ServiceDetailsScreen({ route }: AppScreenProps<'ServiceDetailsScreen'>) {
  const details = route.params;

  const backgroundImage =
    mapImageDetails[details.category as keyof typeof mapImageDetails] || mapImageDetails.OTHERS;

  const interval = calculateInterval(new Date(details.createdAt), new Date());

  return (
    <>
      <ImageBackground source={backgroundImage} className="h-80 bg-cover pl-5 pt-14">
        <Header />
      </ImageBackground>

      <Box notpt>
        <View className="flex-1">
          <View className="mt-5 gap-1">
            <Text className="font-bold text-2xl">{details.name}</Text>

            <View className="flex-row items-center gap-2">
              <View className="flex-row items-center gap-1">
                <Star size={16} color="black" fill="black" />
                <Text className="text-gray-500">{details.rating}</Text>
              </View>

              <View className="flex-row items-center gap-1">
                <Timer size={16} color="black" />
                <Text className="text-gray-500">{interval}</Text>
              </View>
            </View>
          </View>

          <View className="mt-5 gap-1">
            <Text className="font-bold text-xl">Descrição</Text>
            <Text className="text-gray-500">{details.description}</Text>
          </View>

          <LocationDetails {...details.location} />

          <ContactDetails location={details.location} userPhoneNumber={details.userPhoneNumber} />
        </View>

        <View className="-mx-6 h-px bg-gray-300" />

        <View className="flex-row items-center py-3">
          <View className="flex-1">
            <Text className="text-2xl text-gray-500">Preço</Text>
            <Text className="font-bold text-xl text-black underline">{details.price}</Text>
          </View>

          <CustomButton variant="secondary" title="Candidatar-se" />
        </View>
      </Box>
    </>
  );
}
