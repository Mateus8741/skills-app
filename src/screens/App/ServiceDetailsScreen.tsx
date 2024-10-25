import { ImageBackground, Text, View } from 'react-native';

import { Box, Header, LocationDetails } from '~/components';
import { AppScreenProps } from '~/routes';
import { mapImageDetails } from '~/utils';

export function ServiceDetailsScreen({ route }: AppScreenProps<'ServiceDetailsScreen'>) {
  const details = route.params;

  const backgroundImage =
    mapImageDetails[details.category as keyof typeof mapImageDetails] || mapImageDetails.OTHERS;

  return (
    <>
      <ImageBackground
        source={backgroundImage}
        className="bg-cover pl-5 pt-14"
        style={{ height: 200 }}>
        <Header />
      </ImageBackground>

      <Box notpt>
        <View className="mt-5 gap-1">
          <Text className="font-bold text-2xl">{details.name}</Text>
          <Text className="text-gray-500">{details.description}</Text>
        </View>

        <View className="mt-5 gap-1">
          <Text className="font-bold text-xl">Price</Text>
          <Text className="text-gray-500">{details.price}</Text>
        </View>

        <View className="mt-5 gap-1">
          <Text className="font-bold text-xl">Duration</Text>
          <Text className="text-gray-500">duracation of service</Text>
        </View>

        <LocationDetails {...details.location} />
      </Box>
    </>
  );
}
