import { useCreateDream } from '@/entities/dream/dream.repository';
import Button from '@/shared/ui/buttons/Button';
import Input from '@/shared/ui/controller/Input';
import Grid from '@/shared/ui/grid/Grid';
import { useState } from 'react';

export default function CreateDreamInput() {
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
  );
}
