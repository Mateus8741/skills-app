import { Image, Pressable, PressableProps, Text, View } from 'react-native';

interface CategoryCardProps extends PressableProps {
  name: string;
  image: any;
  servicesCount?: number;
}

export function CategoryCard({ name, image, servicesCount, ...rest }: CategoryCardProps) {
  return (
    <View className="flex-1 items-center">
      <Pressable className="w-40 rounded-2xl bg-white shadow-sm active:opacity-70" {...rest}>
        <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
          <View className="relative">
            <Image source={image} className="h-32 w-full" resizeMode="cover" />
            <View className="absolute inset-0 bg-black/5" />
          </View>

          <View className="p-4">
            <Text className="text-center font-bold text-base text-gray-800" numberOfLines={1}>
              {name}
            </Text>

            <View className="mt-2 flex-row items-center justify-center gap-2">
              <View className="h-2 w-2 rounded-full bg-green-500" />
              <Text className="text-sm text-gray-600">
                {servicesCount || Math.floor(Math.random() * 100) + 50} serviços
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
}
