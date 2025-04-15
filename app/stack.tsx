import { Stack } from 'expo-router';

export default function GeneralStack() {
  return (
    <Stack initialRouteName="screens/onboarding">
      <Stack.Screen name="screens/homeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/dream/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="screens/onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
