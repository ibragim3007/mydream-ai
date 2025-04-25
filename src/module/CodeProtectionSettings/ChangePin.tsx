import PageWrapper from '@/shared/ui/layout/PageWrapper';
import { PinCode } from '../PinCode';
import { useProtection } from '@/entities/useProtection/useProtection';
import { Alert } from 'react-native';
import { router } from 'expo-router';

export default function ChangePin() {
  const { setCodeProtection } = useProtection(state => state);

  const onResultCreateNew = (code: string) => {
    setCodeProtection(Number(code));
    Alert.alert('Success', 'New code has been set successfully');
    router.canGoBack() && router.back();
  };

  return (
    <PageWrapper>
      <PinCode title="Update your code" onResult={onResultCreateNew} isBiometricOn={false} />
    </PageWrapper>
  );
}
