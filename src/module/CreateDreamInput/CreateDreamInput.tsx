import { useCreateDream } from '@/entities/dream/dream.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import Button from '@/shared/ui/buttons/Button';
import Input from '@/shared/ui/controller/Input';
import Grid from '@/shared/ui/grid/Grid';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import ModalContainer from '@/shared/ui/wrapper/ModalContainer';
import { useState } from 'react';
import { ActivityIndicator, Modal, StyleSheet } from 'react-native';

export default function CreateDreamInput() {
  const colors = useTheme();
  const { createDreamFunction, isPending } = useCreateDream();

  const onPressCreateDream = async () => {
    setDreamText('');
    await createDreamFunction({
      inputText: dreamText,
    });
  };

  const [dreamText, setDreamText] = useState('');
  const onChangeText = (text: string) => {
    setDreamText(text);
  };

  const isButtonDisabled = dreamText.trim().length === 0 || isPending;
  const isInputDisabled = isPending;

  return (
    <>
      <Grid space="md">
        <Input
          value={dreamText}
          onChangeText={onChangeText}
          placeholder="Enter your dream"
          multiline
          numberOfLines={3}
          style={{ height: 120 }}
        />
        <Button onPress={onPressCreateDream} disabled={isButtonDisabled}>
          Create
        </Button>
      </Grid>

      {/* Модальная карточка с индикатором загрузки */}
      <Modal transparent visible={isPending} animationType="fade">
        <ModalContainer>
          <Paper style={{ backgroundColor: colors.background.primary }}>
            <Grid space="md">
              <Typography weight="bold" variant="title-3">
                Analyzing your dream...
              </Typography>
              <ActivityIndicator size="large" />
            </Grid>
          </Paper>
        </ModalContainer>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  spinnerCard: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
