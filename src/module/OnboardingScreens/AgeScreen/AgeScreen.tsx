import { useUserTags } from '@/entities /userTags/userTags.repository';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

interface AgeScreenProps {
  agePickerComponent: React.ReactNode;
}

export default function AgeScreen({ agePickerComponent }: AgeScreenProps) {
  const { age } = useUserTags();
  const isDisabled = !age;
  return (
    <SafeWrapper>
      <Grid height="100%" justfity="space-between" paddingVertical={20}>
        <Grid paddingVertical={20}>
          <Typography variant="largeTitle" weight="bold">
            How old are you?
          </Typography>
        </Grid>
        {agePickerComponent}
        <Button variant="text">Don&apos;t share</Button>
        <Grid marginBottom={16}>
          <Button disabled={isDisabled}>Continue</Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
