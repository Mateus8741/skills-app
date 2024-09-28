import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export function Header() {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }
  return (
    <View>
      <Pressable onPress={handleGoBack}>
        <ArrowLeft size={40} color="black" />
      </Pressable>
    </View>
  );
}
