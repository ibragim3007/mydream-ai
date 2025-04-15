import { Stack } from 'expo-router';

export default function GeneralStack() {
  return (
    <Stack>
      <Stack.Screen name="screens/homeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
