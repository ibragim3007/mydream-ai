import { useProtection } from '@/entities/useProtection/useProtection';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { PinCode } from '../PinCode';

export default function ChangePin() {
  const { setCodeProtection } = useProtection(state => state);

  const onResultCreateNew = (code: string) => {
    setCodeProtection(Number(code));
    Alert.alert('Success', 'New code has been set successfully');
    router.canGoBack() && router.back();
  };

  return <PinCode title="Update your code" onResult={onResultCreateNew} isBiometricOn={false} />;
}
