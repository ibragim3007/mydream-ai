import { useUserTags } from '@/entities/userTags/userTags.repository';
import AnimatedWrapper from '@/shared/ui/animations/AnimatedWrapper';
import Button from '@/shared/ui/buttons/Button';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Input from '@/shared/ui/controller/Input';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

interface EnterNameScreenProps {
  onPressButton: () => void;
  goPrevPage: () => void;
}

export default function EnterNameScreen({ onPressButton, goPrevPage }: EnterNameScreenProps) {
  const [nameText, setNameText] = useState('');
  const { updateName } = useUserTags();
  const isDisabled = nameText.length === 0;
  const onChangeName = (text: string) => {
    setNameText(text);
  };

  const onPressButtonFunc = () => {
    updateName(nameText);
    onPressButton();
  };

  return (
    <SafeWrapper style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Grid height="100%" justfity="space-between" paddingVertical={20}>
          <Grid space="md">
            <Grid align="flex-start">
              <GoBackButton onPress={goPrevPage} />
            </Grid>
            <Typography variant="largeTitle" weight="extra-bold">
              What&apos;s your name?
            </Typography>
            <Typography color="disabled">Enter your name to personalize your experience</Typography>
          </Grid>

          <AnimatedWrapper>
            <Input autoFocus={true} placeholder="Your name" onChangeText={onChangeName} />
          </AnimatedWrapper>

          <AnimatedWrapper style={{ marginBottom: 16 }}>
            <Button disabled={isDisabled} onPress={onPressButtonFunc}>
              Continue
            </Button>
          </AnimatedWrapper>
        </Grid>
      </KeyboardAvoidingView>
    </SafeWrapper>
  );
}
