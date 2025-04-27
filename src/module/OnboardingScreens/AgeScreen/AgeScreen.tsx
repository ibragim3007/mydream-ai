import Button from '@/shared/ui/buttons/Button';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

interface AgeScreenProps {
  agePickerComponent: React.ReactNode;
  onPressButton: () => void;
  goPrevPage: () => void;
}

export default function AgeScreen({ agePickerComponent, onPressButton, goPrevPage }: AgeScreenProps) {
  return (
    <SafeWrapper>
      <Grid height="100%" space="md" paddingVertical={20}>
        <Grid align="flex-start">
          <GoBackButton onPress={goPrevPage} />
        </Grid>
        <Grid>
          <Typography variant="largeTitle" weight="bold">
            How old are you?
          </Typography>
        </Grid>
        <Grid space="lg">
          {agePickerComponent}
          <Button onPress={onPressButton} variant="text">
            Don&apos;t share
          </Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
