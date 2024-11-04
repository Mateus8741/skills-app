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
    <TouchableOpacity 
      className="mt-4"
      activeOpacity={0.7}
      {...rest}
    >
      <View className="rounded-xl bg-white px-5 py-4 shadow-sm">
        <View className="flex-row items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <View className="flex-row items-center gap-3">
            <View className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <BriefcaseBusiness color="#16a34a" size={28} />
            </View>

            <View>
              <View className="flex-row items-center gap-1">
                <Text className="text-lg font-bold text-gray-800">{service.name}</Text>
                {service.isAuthenticaded && <BadgeCheck color="#16a34a" size={20} />}
              </View>
              
              <View className="flex-row items-center gap-1 mt-1">
                <Star color="#fbbf24" fill="#fbbf24" size={16} />
                <Text className="text-sm text-gray-500">{service.rating}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="mt-4 space-y-2">
          <View className="flex-row items-center gap-3">
            <MapPinCheck color="#6b7280" size={18} />
            <Text className="text-sm text-gray-600">{service.location.street}</Text>
          </View>

          <View className="flex-row items-center gap-3">
            <Banknote color="#16a34a" size={18} />
            <Text className="text-base font-semibold text-green-600">{service.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
