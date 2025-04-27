import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import LottieView from 'lottie-react-native';
import { useRef } from 'react';
import LoadingAnimation from '@/assets/animations/anim3.json';
import ProgressAnimation from '@/assets/animations/progress.json';

interface ProgrevScreenProps {
  onFinishAnimation: () => void;
}

export default function ProgrevScreen({ onFinishAnimation }: ProgrevScreenProps) {
  const animation = useRef<LottieView>(null);

  const handleAnimationFinish = () => {
    onFinishAnimation();
  };

  return (
    <PageWrapper>
      <SafeWrapper style={{ flex: 1 }}>
        <Grid space="lg" flex={1} justfity="center">
          <Grid>
            <LottieView
              autoPlay
              resizeMode="contain"
              ref={animation}
              style={{
                width: '100%',
                height: 300,
                // backgroundColor: 'red',
              }}
              source={LoadingAnimation}
            />
            <Typography weight="bold" variant="largeTitle" textAlign="center">
              We are preparing your personalized experienceq
            </Typography>
          </Grid>
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={handleAnimationFinish}
            speed={0.5}
            resizeMode="cover"
            style={{
              width: '100%',
              height: 90,
            }}
            source={ProgressAnimation}
          />
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
