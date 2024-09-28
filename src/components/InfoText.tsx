import { Text } from 'react-native';

interface InfoTextProps {
  text: string;
}

export function InfoText({ text }: InfoTextProps) {
  return <Text className="font-bold text-3xl text-green-600">{text}</Text>;
}
