import { Text } from 'react-native';

import { Box } from '~/components';
import { AuthScreenProps } from '~/routes';

export function ConfirmLocation({ navigation, route }: AuthScreenProps<'ConfirmLocation'>) {
  return (
    <Box>
      <Text>ConfirmLocation</Text>
    </Box>
  );
}
