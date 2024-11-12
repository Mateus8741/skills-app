import AsyncStorage from '@react-native-async-storage/async-storage';

interface Tokens {
  accessToken: string;
  refreshToken?: string;
}

export const AUTH_STORAGE_KEY = '@app:tokens';

export async function storeTokens(tokens: Tokens) {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(tokens));
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
}

export async function getStoredTokens(): Promise<Tokens | null> {
  try {
    const tokens = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    return tokens ? JSON.parse(tokens) : null;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
}

export async function removeTokens() {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Error removing tokens:', error);
  }
} 