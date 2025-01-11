import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ThemeType = 'light' | 'dark' | 'system' | undefined;

interface ThemeProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const useThemeStore = create<ThemeProps>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export function useThemeStorage() {
  const { theme, setTheme } = useThemeStore();

  return { theme, setTheme };
}
