import { useUserTags } from '@/entities /userTags/userTags.repository';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

interface AgeScreenProps {
  agePickerComponent: React.ReactNode;
  onPressButton: () => void;
}

export default function AgeScreen({ agePickerComponent, onPressButton }: AgeScreenProps) {
  const { age } = useUserTags();
  const isDisabled = !age;
  return (
    <SafeWrapper>
      <Grid height="100%" justfity="space-between" paddingVertical={20}>
        <Grid>
          <Typography variant="largeTitle" weight="bold">
            How old are you?
          </Typography>
        </Grid>
        {agePickerComponent}
        <Button onPress={onPressButton} variant="text">
          Don&apos;t share
        </Button>
        <Grid marginBottom={16}>
          <Button onPress={onPressButton} disabled={isDisabled}>
            Continue
          </Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
