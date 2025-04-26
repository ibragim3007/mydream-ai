import BlockImage from '@/assets/other/block_image.png';
import { PLACEMENTS } from '@/shared/config/constants/constants';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useVibration } from '@/shared/hooks/useVibration';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import Superwall from '@superwall/react-native-superwall';
import { Image } from 'expo-image';

export default function SubBlock() {
  const { isActive } = useSubscription();
  const { vibrate } = useVibration();
  const onPress = () => {
    vibrate();
    Superwall.shared.register({
      placement: PLACEMENTS.campaign_trigger,
    });
  };

  if (isActive) {
    return null;
  }

  return (
    <Grid
      height={260}
      style={{
        shadowColor: '#380077',
        shadowOpacity: 0.2,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 0 },
      }}
    >
      <Image
        contentFit="cover"
        source={BlockImage}
        style={{
          borderWidth: 1,
          borderColor: '#fff',
          width: '100%',
          height: '100%',
          borderRadius: 30,
          position: 'absolute',
        }}
      />
      <Grid space="md" justfity="space-between" flex={1} padding={25}>
        <Grid space="md" justfity="center">
          <Typography weight="extra-bold" variant="title-2">
            MyDream AI – Premium
          </Typography>
          <Grid
            style={{ shadowColor: '#fff', shadowOpacity: 0.6, shadowRadius: 3, shadowOffset: { height: 0, width: 0 } }}
          >
            <Typography>Free for 3 days</Typography>
            <Typography>Decode Every Dream</Typography>
            <Typography>Premium voice capture</Typography>
            <Typography>One-tap Dream Continuation </Typography>
          </Grid>
        </Grid>
        <Grid width="60%" flex={1} justfity="flex-end">
          <Button onPress={onPress}>Start trial</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
