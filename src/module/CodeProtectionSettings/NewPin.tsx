import { useProtection } from '@/entities/useProtection/useProtection';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import { router } from 'expo-router';
import { Alert } from 'react-native';
import { PinCode } from '../PinCode';

export default function NewPin() {
  const { biometric, codeProtection, setCodeProtection, setBiometric } = useProtection(state => state);

  const onResultCreateNew = (code: string) => {
    setCodeProtection(Number(code));
    Alert.alert('Success', 'New code has been set successfully');
    router.canGoBack() && router.back();
  };

  return (
    <PageWrapper>
      <PinCode onResult={onResultCreateNew} title={'Enter your new code'} isBiometricOn={false} />
    </PageWrapper>
  );
}
