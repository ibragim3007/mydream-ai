import { AudioRecorderButton } from '@/module/AudioRecorderButton';
import { useTheme } from '@/shared/hooks/useTheme';
import { fontWeight } from '@/shared/styles/typography/typography';
import DismissModalButton from '@/shared/ui/elements/DismissModalButton';
import { Stack } from 'expo-router';

export default function GeneralStack() {
  const color = useTheme();

  const headerTitleStyle = {
    fontFamily: fontWeight['extra-bold'],
    color: color.text.primary,
  };

  return (
    <Stack initialRouteName="screens/homeScreen">
      <Stack.Screen name="screens/homeScreen" options={{ headerShown: false, animation: 'none' }} />
      <Stack.Screen name="screens/dream/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="screens/onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/settings"
        options={{ headerShown: false }} // заголовок внутри nested-stack
      />
      {/* <Stack.Screen
        name="screens/settingsScreen"
        options={{
          headerShown: true,
          presentation: 'modal',
          headerBlurEffect: 'regular',
          headerTransparent: true,
          headerTitle: 'Settings',
          headerTitleStyle: headerTitleStyle,
          headerLeft: () => <DismissModalButton />,
        }}
      /> */}
      <Stack.Screen
        name="screens/newDreamScreen"
        options={{
          headerShown: true,
          presentation: 'modal',
          headerTitle: 'New dream',
          headerBlurEffect: 'regular',
          headerTransparent: true,
          gestureEnabled: true,
          headerTitleStyle: headerTitleStyle,
          headerLeft: () => <DismissModalButton />,
          headerRight: () => <AudioRecorderButton />,
        }}
      />
      <Stack.Screen name="utilsScreens/blockScreen" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="utilsScreens/lockScreen" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}
