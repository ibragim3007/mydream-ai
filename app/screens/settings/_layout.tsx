import { Stack } from 'expo-router';
import DismissModalButton from '@/shared/ui/elements/DismissModalButton';
import { useTheme } from '@/shared/hooks/useTheme';
import { fontWeight } from '@/shared/styles/typography/typography';

export default function SettingsLayout() {
  const color = useTheme();

  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerTransparent: true,
        headerBlurEffect: 'regular',
        gestureEnabled: true,
        animation: 'slide_from_right', // плавное смещение влево
        headerTitleStyle: {
          fontFamily: fontWeight['extra-bold'],
          color: color.text.primary,
        },
        headerLeft: () => <DismissModalButton />,
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: 'Settings' }} />
      <Stack.Screen name="nameUpdateScreen" options={{ headerTitle: 'Change name' }} />
      <Stack.Screen name="newPinScreen" options={{ headerTitle: '' }} />

      <Stack.Screen
        name="codeProtection"
        options={{ headerTitle: 'Code protection', presentation: 'containedModal' }}
      />
      {/* добавляйте здесь другие экраны настроек */}
    </Stack>
  );
}
