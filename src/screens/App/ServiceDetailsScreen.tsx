import { Text } from 'react-native';

import { Box } from '~/components';
import { AppScreenProps } from '~/routes';

export function ServiceDetailsScreen({ route }: AppScreenProps<'ServiceDetailsScreen'>) {
  const { location } = route.params;

  return (
    <Box>
      <Text>ServiceDetailsScreen</Text>

      <Text>{location.street}</Text>
    </Box>
  );
}
