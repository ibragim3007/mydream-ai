import moonImage from '@/assets/icons/moonImage.png';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';

interface WelcomeScreenProps {
  onPressButton: () => void;
}

export default function WelcomeScreen({ onPressButton }: WelcomeScreenProps) {
  return (
    <SafeWrapper>
      <Grid height="100%" align="center" justfity="space-around">
        <Grid flex={1} justfity="center" space="md" align="center">
          <Typography variant="largeTitle" weight="extra-bold" textAlign="center">
            Welcome to Dreamlens AI!
          </Typography>
          <Grid
            style={{
              shadowColor: '#B9D3EA',
              shadowOpacity: 1,
              shadowRadius: 22,
            }}
          >
            <Image source={moonImage} style={{ height: 100, width: 100 }} />
          </Grid>
        </Grid>
        <Grid width="100%">
          <Button onPress={onPressButton}>Continue</Button>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
