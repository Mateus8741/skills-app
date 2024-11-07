import { ChevronDown } from 'lucide-react-native';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  errorMessage?: string;
  moreClassName?: string;
}

export function Select({
  label,
  placeholder = 'Selecione uma opção',
  options,
  value,
  onValueChange,
  errorMessage,
  moreClassName,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <View className={`${moreClassName}`}>
      {label && <Text className="mb-1 text-sm text-gray-600">{label}</Text>}

      <Pressable
        className={`flex-row items-center justify-between rounded-lg border bg-white px-4 py-3.5
          ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
        onPress={() => setIsOpen(true)}>
        <Text className={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
          {selectedOption?.label || placeholder}
        </Text>
        <ChevronDown size={20} color="#9CA3AF" />
      </Pressable>

      {errorMessage && <Text className="mt-1 text-xs text-red-500">{errorMessage}</Text>}

      <Modal visible={isOpen} transparent animationType="fade">
        <Pressable className="flex-1 bg-black/20" onPress={() => setIsOpen(false)}>
          <View className="flex-1 justify-end">
            <View className="rounded-t-2xl bg-white">
              <View className="border-b border-gray-200 p-4">
                <Text className="font-bold text-lg text-gray-800">{label || 'Selecione'}</Text>
              </View>

              <ScrollView className="max-h-80">
                {options.map((option) => (
                  <Pressable
                    key={option.value}
                    className={`border-b border-gray-100 p-4 active:bg-gray-50
                      ${option.value === value ? 'bg-green-50' : ''}`}
                    onPress={() => {
                      onValueChange?.(option.value);
                      setIsOpen(false);
                    }}>
                    <Text
                      className={`text-base
                        ${option.value === value ? 'font-medium text-green-600' : 'text-gray-700'}`}>
                      {option.label}
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
