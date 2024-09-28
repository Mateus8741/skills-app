import { Text, View } from 'react-native';

export function InfoTerms() {
  return (
    <View>
      <Text className="text-center text-sm text-gray-500">
        Ao continuar, você concorda com os{' '}
        <Text className="font-bold text-black">Termos de Serviço</Text> e a{' '}
        <Text className="font-bold text-black">Política de Privacidade</Text> do{' '}
        <Text className="font-bold italic text-green-600">Skill's</Text>
      </Text>
    </View>
  );
}
