import { useUserTags } from '@/entities /userTags/userTags.repository';
import AnimatedWrapper from '@/shared/ui/animations/AnimatedWrapper';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

interface GoalsScreenProps {
  goalsPickerComponent: React.ReactNode;
}

export default function GoalsScreen({ goalsPickerComponent }: GoalsScreenProps) {
  const { goals } = useUserTags();
  const isDisabled = goals.length === 0;
  return (
    <SafeWrapper>
      <Grid paddingVertical={20} justfity="space-between" height="100%">
        <Grid space="sm">
          <Typography variant="largeTitle" weight="extra-bold">
            What are your goals?
          </Typography>
        </Grid>
        <AnimatedWrapper>{goalsPickerComponent}</AnimatedWrapper>
        <Grid marginBottom={15} space="lg">
          <Button disabled={isDisabled}>Continue</Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
