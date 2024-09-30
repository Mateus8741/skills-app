import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }
  return (
    <View className="flex-row items-center justify-between">
      <Pressable onPress={handleGoBack}>
        <ArrowLeft size={40} color="black" />
      </Pressable>

      <Text className="text-center font-subtitle text-black">{title}</Text>

      <View className="w-10" />
    </View>
  );
}
