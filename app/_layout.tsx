import { queryClient } from '@/shared/api/api';
import { Environment } from '@/shared/config/config';
import ThemeProvider from '@/shared/providers/ThemeProvider';
import { isAppToken } from '@/shared/service/appId.service';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';
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
import * as Sentry from '@sentry/react-native';
import Superwall, { LogLevel, LogScope, SuperwallOptions } from '@superwall/react-native-superwall';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { router, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { vexo } from 'vexo-analytics';
import GeneralStack from './stack';
import { UserInactivityProvider } from '@/shared/providers/UserInactivity';
import { useProtection } from '@/entities/useProtection/useProtection';
import ToastManager from 'toastify-react-native';
import { Appearance } from 'react-native';
import Purchases from 'react-native-purchases';

Sentry.init({
  dsn: 'https://75639b83524ceb4e5cd2f365c943e3a3@o4509188089708544.ingest.us.sentry.io/4509188098949120',

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],
  // debug: __DEV__,

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

if (!__DEV__) {
  vexo(Environment.vexo_api_key || '');
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default Sentry.wrap(function RootLayout() {
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
  const [isReadyToShowStack, setIsReadyToShowStack] = useState(false);

  useEffect(() => {
    Appearance.setColorScheme('dark');
    // Инициализируем Purchases и Superwall
    try {
      const apiKeyRevenue =
        Platform.OS === 'ios'
          ? (Environment.revenue_api_key_IOS as string)
          : (Environment.revenue_api_key_ANDROID as string);

      const apiKeySuperwall = Platform.OS === 'ios' ? (Environment.superwall_api_key as string) : 'API_KEY_ANDROID';

      Purchases.configure({
        apiKey: apiKeyRevenue,
      });

      const options = new SuperwallOptions();
      options.logging.level = LogLevel.Warn;
      options.logging.scopes = [LogScope.PaywallPresentation, LogScope.PaywallTransactions];
      Superwall.configure({
        apiKey: apiKeySuperwall,
        options: options,
      });
      Superwall.shared.preloadAllPaywalls();
    } catch (error) {
      errorLogger.logError('Error configuring Superwall');
      console.error('Error configuring Superwall:', error);
    }
  }, []);

  const { codeProtection, biometric, blockTime } = useProtection(state => state);

  useEffect(() => {
    const initializeApp = async () => {
      if (loaded) {
        if (navigationState?.key && !redirected) {
          // Проверяем, что навигация инициализирована и редирект ещё не выполнен
          try {
            if (codeProtection || biometric) {
              router.replace('/utilsScreens/lockScreen');
            } else {
              const appToken = await isAppToken();

              if (appToken) router.replace('/screens/homeScreen');
              else router.replace('/screens/onboarding');

              void SplashScreen.hideAsync();
              setRedirected(true); // Чтобы избежать повторного редиректа
            }
          } catch (error) {
            void SplashScreen.hideAsync();
            errorLogger.logError('Error fetching app token');
          }
        }
      }
    };

    if (loaded) {
      setIsReadyToShowStack(true); // Теперь можно показать GeneralStack
    }

    void initializeApp();
  }, [loaded, navigationState?.key, redirected]);

  if (!loaded || !isReadyToShowStack) {
    return null;
  }

  return (
    <ThemeProvider>
      <UserInactivityProvider blockTime={blockTime} isProtected={codeProtection || biometric ? true : false}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="light" />
            <GeneralStack />
            <ToastManager />
          </GestureHandlerRootView>
        </QueryClientProvider>
      </UserInactivityProvider>
    </ThemeProvider>
  );
});
