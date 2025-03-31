import { useUserTags } from '@/entities /userTags/userTags.repository';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';

interface ZodiacSignScreenProps {
  zodiacSignComponent: React.ReactNode;
  onPressButton: () => void;
}

export default function ZodiacSignScreen({ zodiacSignComponent, onPressButton }: ZodiacSignScreenProps) {
  const { zodiacSign } = useUserTags();
  const isDisabled = !zodiacSign;
  return (
    <SafeWrapper>
      <Grid paddingVertical={20} height="100%" justfity="space-between">
        <Grid>
          <Grid marginRight={50}>
            <Typography variant="largeTitle" weight="extra-bold">
              Choose your zodiac sign
            </Typography>
          </Grid>
        </Grid>
        <Grid>{zodiacSignComponent}</Grid>
        <Grid marginBottom={16}>
          <Button onPress={onPressButton} disabled={isDisabled}>
            Continue
          </Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
