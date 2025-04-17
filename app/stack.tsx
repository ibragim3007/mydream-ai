import { useTheme } from '@/shared/hooks/useTheme';
import { fontWeight } from '@/shared/styles/typography/typography';
import { router, Stack } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import { Pressable } from 'react-native';

export default function GeneralStack() {
  const color = useTheme();
  return (
    <Stack initialRouteName="screens/onboarding">
      <Stack.Screen name="screens/homeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/dream/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="screens/onboarding" options={{ headerShown: false }} />
      <Stack.Screen
        name="screens/newDreamScreen"
        options={{
          headerShown: true,
          presentation: 'modal',
          headerTitle: 'New dream',
          headerBlurEffect: 'regular',
          headerTransparent: true,
          gestureEnabled: false,
          headerTitleStyle: {
            fontFamily: fontWeight['extra-bold'],
            color: color.text.primary,
          },
          headerLeft: props => {
            return (
              <Pressable
                onPress={() => router.dismiss()}
                style={{
                  // backgroundColor: 'red',
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Entypo name="chevron-down" size={24} color={color.text.primary} />
              </Pressable>
            );
          },
        }}
      />

      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
