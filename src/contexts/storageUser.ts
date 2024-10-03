import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { UserSchema } from '~/schemas';

type UserProps = {
  user: UserSchema | null;
  setUser: (user: UserSchema) => void;
  removeUser: () => void;
};

const useUserStore = create<UserProps>()(
  persist(
    (set) => ({
      user: {
        token: '',
        user: {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          isAuthenticated: false,
          rating: 0,
        },
      },
      setUser: (user) => set({ user }),
      removeUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export function useUserStorage() {
  const { user, setUser, removeUser } = useUserStore();

  return { user, setUser, removeUser };
}
