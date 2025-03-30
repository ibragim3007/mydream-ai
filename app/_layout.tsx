import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { router, useRootNavigationState } from 'expo-router';
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
} from '@expo-google-fonts/open-sans';
import GeneralStack from './stack';
import ThemeProvider from '@/shared/providers/ThemeProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
  });

  const navigationState = useRootNavigationState();
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    if (loaded) {
      void SplashScreen.hideAsync();
    }

    // Проверяем, что навигация инициализирована и редирект ещё не выполнен
    if (navigationState?.key && !redirected) {
      const isUserOnboarded = false;

      if (isUserOnboarded) {
        router.replace('/(tabs)');
      } else {
        router.replace('/screens/onboarding');
      }

      setRedirected(true); // Чтобы избежать повторного редиректа
    }
  }, [loaded, navigationState?.key, redirected]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <GeneralStack />
    </ThemeProvider>
  );
}
