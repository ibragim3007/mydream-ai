import moonImage from '@/assets/icons/moonImage.png';
import { animationEngine } from '@/shared/service/animation.service';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';

interface WelcomeScreenProps {
  onPressButton: () => void;
}

export default function WelcomeScreen({ onPressButton }: WelcomeScreenProps) {
  return (
    <SafeWrapper>
      <Grid paddingVertical={20} height="100%" justfity="space-between" align="center">
        <Grid space="md" flex={1} width={'100%'} align="center">
          {/* <EnterFadeText text="Welcome to Dreamlens AI!" /> */}
          <Animated.View entering={animationEngine.zoomInDown(1)}>
            <Typography variant="largeTitle" weight="extra-bold" textAlign="center">
              Welcome to Dreamlens AI!
            </Typography>
          </Animated.View>

          <Animated.View entering={animationEngine.zoomInDown(2)} style={{ marginTop: 100 }}>
            <Grid
              align="center"
              justfity="center"
              style={{
                shadowColor: '#B9D3EA',
                shadowOpacity: 0.8,
                shadowRadius: 26,
              }}
            >
              <Image source={moonImage} style={{ height: 150, width: 150 }} />
            </Grid>
          </Animated.View>
        </Grid>
        <Grid width="100%" marginBottom={16}>
          <Animated.View entering={animationEngine.zoomInDown(3)}>
            <Button onPress={onPressButton}>Continue</Button>
          </Animated.View>
        </Grid>
      </Grid>
    </SafeWrapper>
  );
}
