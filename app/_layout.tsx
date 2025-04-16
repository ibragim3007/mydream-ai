import { queryClient } from '@/shared/api/api';
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
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { router, useRootNavigationState } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import GeneralStack from './stack';

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
    const initializeApp = async () => {
      if (loaded) {
        void SplashScreen.hideAsync();
      }

      // Проверяем, что навигация инициализирована и редирект ещё не выполнен
      if (navigationState?.key && !redirected) {
        try {
          const appToken = await isAppToken();

          const isUserOnboarded = false;

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
