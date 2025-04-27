import moonImage from '@/assets/icons/moonImage2.png';
import { animationEngine } from '@/shared/service/animation.service';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';
import Animated from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import { Dimensions } from 'react-native';

interface WelcomeScreenProps {
  onPressButton: () => void;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WelcomeScreen({ onPressButton }: WelcomeScreenProps) {
  const animation = useRef<LottieView>(null);

  return (
    <SafeWrapper>
      <LottieView
        autoPlay
        resizeMode="cover"
        // duration={10000}
        speed={0.5}
        ref={animation}
        style={{
          width: windowWidth,
          height: windowHeight,
          backgroundColor: '#0d0d0d',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        source={require('@/assets/animations/welcom_page.json')}
      />

      <Grid paddingVertical={20} justfity="space-around" height="100%">
        <Grid space="md" width={'100%'}>
          {/* <EnterFadeText text="Welcome to Dreamlens AI!" /> */}

          {/* <Animated.View entering={animationEngine.zoomInDown(1)}>
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
          </Animated.View> */}
          <Animated.View entering={animationEngine.zoomInDown(2)}>
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
