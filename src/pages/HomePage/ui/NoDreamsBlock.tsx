import { animationEngine } from '@/shared/service/animation.service';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { normalizedSize } from '@/shared/utils/size';
import LottieView from 'lottie-react-native';
import LadyAnimation from '@/assets/animations/lady_animation.json';

import Animated from 'react-native-reanimated';

export default function NoDreamsBlock() {
  return (
    <Animated.View entering={animationEngine.fadeInUp(1)}>
      <Grid>
        <Typography weight="extra-bold" variant="title-1">
          Your dreams will be displayed here!
        </Typography>
        <LottieView autoPlay style={{ width: '100%', height: normalizedSize(290) }} source={LadyAnimation} />
      </Grid>
    </Animated.View>
  );
}
