import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

interface ChoiceStyleScreenProps {
  onPressButton: () => void;
}

export default function ChoiceStyleScreen({ onPressButton }: ChoiceStyleScreenProps) {
  return (
    <SafeWrapper>
      <Typography variant="headline">Tell us more about yourself</Typography>
      <Typography color="disabled">
        Здесь будут вопросы с group button для ответа инфа о них будет строится в zustand
      </Typography>

      <Grid width="100%">
        <Button onPress={onPressButton}>Continue</Button>
      </Grid>
    </SafeWrapper>
  );
}
