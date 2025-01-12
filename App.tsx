import './global.css';

import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { AuthListener } from '~/api';

import { api, setAuthToken } from '~/api/apiConfig';
import { Loading } from '~/components';
import { useUserStorage } from '~/contexts';
import { Routes } from '~/routes';
import { useThemeChanger } from '~/services';
import { removeTokens } from '~/services/auth';
import { useThemeStorage } from '~/stores';

const queryClient = new QueryClient();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const { theme } = useThemeStorage();
  const { setColorScheme } = useThemeChanger();
  const { removeUser } = useUserStorage();

  useEffect(() => {
    if (theme) {
      setColorScheme(theme);
    }
  }, [theme]);

  useEffect(() => {
    api.registerInterceptTokenManager({
      signOut: () => {
        removeUser();
        removeTokens();
      },
      refreshTokenUpdated: (token) => {
        setAuthToken(token);
      },
    });
  }, [removeUser]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryClientProvider client={queryClient}>
          <AuthListener />
          {fontsLoaded ? <Routes /> : <Loading />}
          <Toast />
        </QueryClientProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
