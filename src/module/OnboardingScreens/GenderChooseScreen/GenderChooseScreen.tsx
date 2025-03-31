import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

interface GenderChooseScreen {
  genderPickerComponent: React.ReactNode;
  onPressButton: () => void;
}

export default function GenderChooseScreen({ genderPickerComponent, onPressButton }: GenderChooseScreen) {
  return (
    <SafeWrapper>
      <Grid space="lg" paddingVertical={20} justfity="space-between" height="100%">
        <Grid space="md">
          <Typography variant="largeTitle" weight="extra-bold">
            What&apos;s your gender?
          </Typography>
          <Typography color="disabled">We&apos;ll personalize your interpretations based on your gender</Typography>
        </Grid>
        <Grid>
          {genderPickerComponent}
          <Button onPress={onPressButton} variant="text">
            Prefer not to say
          </Button>
        </Grid>
        <Grid />
      </Grid>
    </SafeWrapper>
  );
}
