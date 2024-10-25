import { ImageBackground, Text } from 'react-native';

import { Box, Header } from '~/components';
import { AppScreenProps } from '~/routes';
import { mapImageDetails } from '~/utils';

export function ServiceDetailsScreen({ route }: AppScreenProps<'ServiceDetailsScreen'>) {
  const { category } = route.params;
  const backgroundImage = mapImageDetails[category as keyof typeof mapImageDetails];
  //   const backgroundImage = mapImageDetails[category as keyof typeof mapImageDetails] || mapImageDetails.DEFAULT;

  return (
    <Box>
      <ImageBackground source={backgroundImage}>
        <Header />
      </ImageBackground>
      <Text>ServiceDetailsScreen</Text>
      <Text>{category}</Text>
    </Box>
  );
}
