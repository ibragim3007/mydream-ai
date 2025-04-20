import { queryClient } from '@/shared/api/api';
import { Environment } from '@/shared/config/config';
import ThemeProvider from '@/shared/providers/ThemeProvider';
import { isAppToken } from '@/shared/service/appId.service';
import {
  Nunito_200ExtraLight,
  Nunito_200ExtraLight_Italic,
  Nunito_300Light,
  Nunito_300Light_Italic,
  Nunito_400Regular,
  Nunito_400Regular_Italic,
  Nunito_500Medium,
  Nunito_500Medium_Italic,
  Nunito_600SemiBold,
  Nunito_600SemiBold_Italic,
  Nunito_700Bold,
  Nunito_700Bold_Italic,
  Nunito_800ExtraBold,
  Nunito_800ExtraBold_Italic,
  Nunito_900Black,
  Nunito_900Black_Italic,
} from '@expo-google-fonts/nunito';
import Superwall, { LogLevel, LogScope, SuperwallOptions } from '@superwall/react-native-superwall';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { router, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GeneralStack from './stack';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { vexo } from 'vexo-analytics';

if (!__DEV__) {
  vexo(Environment.vexo_api_key || '');
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
    Nunito_200ExtraLight_Italic,
    Nunito_300Light_Italic,
    Nunito_400Regular_Italic,
    Nunito_500Medium_Italic,
    Nunito_600SemiBold_Italic,
    Nunito_700Bold_Italic,
    Nunito_800ExtraBold_Italic,
    Nunito_900Black_Italic,
  });
  const navigationState = useRootNavigationState();
  const [redirected, setRedirected] = useState(false);
  // const { token, isHydrated } = useAuth();

  useEffect(() => {
    try {
      const apiKeyRevenue =
        Platform.OS === 'ios'
          ? (Environment.revenue_api_key_IOS as string)
          : (Environment.revenue_api_key_ANDROID as string);

      const apiKeySuperwall = Platform.OS === 'ios' ? (Environment.superwall_api_key as string) : 'API_KEY_ANDROID';

      try {
        Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
        if (Platform.OS === 'ios') {
          Purchases.configure({ apiKey: apiKeyRevenue });
        } else if (Platform.OS === 'android') {
          Purchases.configure({ apiKey: apiKeyRevenue });
        }

        const options = new SuperwallOptions();
        options.logging.level = LogLevel.Warn;
        options.logging.scopes = [LogScope.PaywallPresentation, LogScope.PaywallTransactions];
        Superwall.configure({
          apiKey: apiKeySuperwall,
          options: options,
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error('Error configuring Superwall:', error);
    }
  }, []);

  useEffect(() => {
    const initializeApp = async () => {
      if (loaded) {
        void SplashScreen.hideAsync();
      }

      // Проверяем, что навигация инициализирована и редирект ещё не выполнен
      if (navigationState?.key && !redirected) {
        try {
          const appToken = await isAppToken();

          const isUserOnboarded = appToken;

          if (isUserOnboarded) {
            router.replace('/screens/homeScreen');
          } else {
            router.replace('/screens/onboarding');
          }

          setRedirected(true); // Чтобы избежать повторного редиректа
        } catch (error) {
          console.error('Error fetching app token:', error);
        }
      }
    };

    void initializeApp();
  }, [loaded, navigationState?.key, redirected]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <StatusBar style="light" />
          <GeneralStack />
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
