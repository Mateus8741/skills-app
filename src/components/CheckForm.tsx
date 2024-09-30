import { LucideCheckCircle2 } from 'lucide-react-native';
import { Text, View } from 'react-native';

interface CheckFormProps {
  hasLowercase: boolean;
  hasMinLength: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export function CheckForm({
  hasLowercase,
  hasMinLength,
  hasNumber,
  hasSpecialChar,
}: CheckFormProps) {
  // Associar os critérios de validação diretamente com as condições
  const checks = [
    {
      title: 'Uma letra de a-z',
      isValid: hasLowercase,
    },
    {
      title: 'Um número de 0-9',
      isValid: hasNumber,
    },
    {
      title: 'Um caractere especial',
      isValid: hasSpecialChar,
    },
    {
      title: 'Mínimo de 8 caracteres',
      isValid: hasMinLength,
    },
  ];

  return (
    <View className="gap-2">
      {checks.map((check, index) => (
        <View className="flex-row items-center gap-2" key={index}>
          <LucideCheckCircle2
            size={24}
            color={check.isValid ? 'green' : 'gray'}
            fill={check.isValid ? 'green' : 'gray'}
            stroke="white"
          />
          <Text className={`font-bold ${check.isValid ? 'text-green-500' : 'text-gray-300'}`}>
            {check.title}
          </Text>
        </View>
      ))}
    </View>
  );
}

{
  /* <View key={check.title} className="flex-row items-center gap-2">
          <LucideCheckCircle2 size={24} color="green" fill="green" stroke="white" />
          <Text className="font-bold text-green-600">{check.title}</Text>
        </View> */
}
