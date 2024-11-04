import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { goBack } = useNavigation();

  function handleGoBack() {
    goBack();
  }

  return (
    <View className="flex-row items-center justify-between py-2">
      <Pressable
        onPress={handleGoBack}
        className="rounded-full bg-green-50 p-2 active:bg-green-100"
        hitSlop={8}>
        <ArrowLeft size={24} color="#16a34a" />
      </Pressable>

      {title && (
        <View className="flex-1 px-4">
          <Text className="text-center font-subtitle text-lg text-gray-900" numberOfLines={1}>
            {title}
          </Text>
        </View>
      )}

      <View className="w-10" />
    </View>
  );
}
