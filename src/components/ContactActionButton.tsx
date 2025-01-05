import { LucideIcon } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

interface ContactActionButtonProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  onPress: () => void;
  variant?: 'default' | 'danger';
}

export function ContactActionButton({
  icon: Icon,
  title,
  subtitle,
  onPress,
  variant = 'default',
}: ContactActionButtonProps) {
  return (
    <Pressable
      className="w-[48%] rounded-xl border border-gray-100 bg-white p-4 active:opacity-70"
      onPress={onPress}>
      <View className="items-center gap-3">
        <View
          className={`rounded-full ${variant === 'danger' ? 'bg-red-100' : 'bg-green-100'} p-3`}>
          <Icon size={24} color={variant === 'danger' ? '#dc2626' : '#16a34a'} />
        </View>
        <View className="items-center">
          <Text className="font-bold text-gray-800">{title}</Text>
          <Text className="text-xs text-gray-500">{subtitle}</Text>
        </View>
      </View>
    </Pressable>
  );
}
