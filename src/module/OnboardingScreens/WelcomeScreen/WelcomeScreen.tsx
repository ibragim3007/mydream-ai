import moonImage from '@/assets/icons/moonImage2.png';
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
      <Grid paddingVertical={20} space="lg" justfity="center" height="100%">
        <Grid space="md" width={'100%'}>
          {/* <EnterFadeText text="Welcome to Dreamlens AI!" /> */}

          <Animated.View entering={animationEngine.zoomInDown(2)}>
            <Grid
              align="center"
              justfity="center"
              style={{
                shadowColor: '#B9D3EA',
                shadowOpacity: 0.4,
                shadowRadius: 35,
              }}
            >
              <Image source={moonImage} style={{ height: 250, width: 250, transform: [{ rotate: '9deg' }] }} />
            </Grid>
          </Animated.View>
          <Animated.View entering={animationEngine.zoomInDown(1)}>
            <Typography variant="title-0" weight="extra-bold" textAlign="center">
              Uncover the deep meaning of your dreams.
            </Typography>
          </Animated.View>
        </Grid>
        <Animated.View entering={animationEngine.zoomInDown(3)}>
          <Grid align="center" marginBottom={16}>
            <Button style={{ width: '75%' }} onPress={onPressButton}>
              Continue
            </Button>
          </Grid>
        </Animated.View>
      </Grid>
    </SafeWrapper>
  );
}
