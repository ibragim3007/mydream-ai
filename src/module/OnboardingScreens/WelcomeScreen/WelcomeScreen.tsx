import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import EarthIcon from '@/assets/icons/earth_icon.png';
import { Image } from 'expo-image';

interface WelcomeScreenProps {
  onPressButton: () => void;
}

export default function WelcomeScreen({ onPressButton }: WelcomeScreenProps) {
  return (
    <SafeWrapper>
      <Grid height="100%" align="center" justfity="space-around">
        <Grid space="md" align="center">
          <Typography variant="title-1" weight="bold" textAlign="center">
            Welcome to Travel AI!
          </Typography>
          <Image source={EarthIcon} style={{ height: 90, width: 90 }} contentFit="contain" />
        </Grid>
        <Grid width="100%">
          <Button onPress={onPressButton}>Continue</Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
