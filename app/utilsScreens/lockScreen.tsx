import { useProtection } from '@/entities/useProtection/useProtection';
import PinCode from '@/module/PinCode/PinCode';
import { storageUserInactivity } from '@/shared/providers/UserInactivity';
import * as Haptic from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

export default function lockScreen() {
  const router = useRouter();
  const { codeProtection, biometric } = useProtection(state => state);

  const onResult = (code: string, isBiometricRight: boolean) => {
    if (Number(code) === codeProtection || isBiometricRight) {
      storageUserInactivity.set('isAppLocked', 'false');
      router.replace('/screens/homeScreen');
    } else {
      Alert.alert('Error', 'Invalid code');
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
    }
  };

  return <PinCode title="Welcome back" onResult={onResult} isPasscodeOn={codeProtection} isBiometricOn={biometric} />;
}
