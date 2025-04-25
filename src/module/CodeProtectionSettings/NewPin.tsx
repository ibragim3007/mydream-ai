import { useProtection } from '@/entities/useProtection/useProtection';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import { PinCode } from '../PinCode';

export default function NewPin() {
  const { biometric, codeProtection, setCodeProtection, setBiometric } = useProtection(state => state);

  const onResultCreateNew = (code: string) => {
    setCodeProtection(Number(code));
  };

  return (
    <PageWrapper>
      <PinCode onResult={onResultCreateNew} title={'Enter your new code'} isBiometricOn={false} />
    </PageWrapper>
  );
}
