import { BadgeCheck, Banknote, BriefcaseBusiness, MapPinCheck, Star } from 'lucide-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface ServiceCardProps extends TouchableOpacityProps {
  service: {
    name: string;
    price: string;
    rating: number;
    isAuthenticaded: boolean;
    location: {
      street: string;
      neighborhood: string;
    };
  };
}

export function ServiceCard({ service, ...rest }: ServiceCardProps) {
  return (
    <TouchableOpacity className="mt-8" {...rest}>
      <View className="rounded-lg bg-white px-6 py-4 shadow-sm">
        <View className="flex-row items-center justify-between gap-2 border-b-2 border-gray-100 pb-4">
          <View className="flex-row items-center gap-2">
            <View className="flex h-12 w-12 items-center justify-center rounded-full bg-green-200">
              <BriefcaseBusiness color="black" size={24} />
            </View>

            <View className="flex-row items-center gap-1">
              <Text className="font-semibold text-black">{service.name}</Text>

              {service.isAuthenticaded && <BadgeCheck color="white" fill="green" size={18} />}
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <Star color="black" fill="black" size={14} />
            <Text className="text-gray-500">({service.rating})</Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center gap-2">
          <MapPinCheck color="black" size={16} />
          <Text className="text-gray-500">{service.location.street}</Text>
        </View>

        <View className="mt-2 flex-row items-center gap-2">
          <Banknote color="black" size={16} />
          <Text className="text-gray-500">{service.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
