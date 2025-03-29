import { useUserTags } from '@/entities /userTags/userTags.repository';
import AnimatedWrapper from '@/shared/ui/animations/AnimatedWrapper';
import Button from '@/shared/ui/buttons/Button';
import Input from '@/shared/ui/controller/Input';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

interface EnterNameScreenProps {
  onPressButton: () => void;
}

export default function EnterNameScreen({ onPressButton }: EnterNameScreenProps) {
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
      <Grid flex={1} height="100%">
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <AnimatedWrapper>
            <Grid marginBottom={170} space="lg">
              <Grid space="md">
                <Typography variant="title-0" weight="bold">
                  Your name
                </Typography>
                <Input placeholder="Your name" onChangeText={onChangeName} />
              </Grid>
              <Grid width="100%">
                <Button disabled={isDisabled} onPress={onPressButtonFunc}>
                  Continue
                </Button>
              </Grid>
            </Grid>
          </AnimatedWrapper>
        </KeyboardAvoidingView>
      </Grid>
    </SafeWrapper>
  );
}
