import UserAvatar from '@/entities/auth/ui/UserAvatar';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { animationEngine } from '@/shared/service/animation.service';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import Animated from 'react-native-reanimated';
import MoonImage from '@/assets/icons/moonImage2.png';
import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';

interface HeaderDreamProps {
  dream: GetDreamDto;
}

export default function HeaderDream({ dream }: HeaderDreamProps) {
  const goBack = () => {
    router.back();
  };
  return (
    <Grid>
      <Grid paddingHorizontal={HORIZONTAL_PADDINGS} row align="center" justfity="space-between" space="lg">
        <GoBackButton onPress={goBack} />
        <Animated.View entering={animationEngine.zoomInDown(0)}>
          <Typography textAlign="center" variant="title-3" weight="extra-bold">
            Dream
          </Typography>
        </Animated.View>
        <Grid style={{ opacity: 0 }}>
          <GoBackButton onPress={() => {}} />
        </Grid>
      </Grid>
      <Grid align="center" space="lg">
        <Grid align="center" paddingHorizontal={HORIZONTAL_PADDINGS}>
          <Animated.View entering={animationEngine.zoomInDown(1)}>
            <Image source={MoonImage} style={{ height: 140, width: 140 }} />
          </Animated.View>
          <Animated.View entering={animationEngine.zoomInDown(2)}>
            <Grid space="sm" align="center">
              <Typography textAlign="center" weight="bold" variant="title-1">
                {dream.title}
              </Typography>
              <UserAvatar />
            </Grid>
          </Animated.View>
        </Grid>
      </Grid>
    </Grid>
  );
}
