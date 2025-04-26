import BlockImage from '@/assets/other/block_image.png';
import { PLACEMENTS } from '@/shared/config/constants/constants';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useVibration } from '@/shared/hooks/useVibration';
import Button from '@/shared/ui/buttons/Button';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import Superwall from '@superwall/react-native-superwall';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import Purchases from 'react-native-purchases';
import { getWeeklyPurchaseCount } from './helpers/generatePeopleNumber';

interface SubBlockProps {
  title?: string;
}

export default function SubBlock({ title }: SubBlockProps) {
  const { isActive } = useSubscription();
  const { vibrate } = useVibration();
  const [currentPrice, setCurrentPrice] = useState<string>();
  const onPress = () => {
    vibrate();
    Superwall.shared.register({
      placement: PLACEMENTS.campaign_trigger,
    });
  };

  useEffect(() => {
    (async () => {
      const res = await Purchases.getProducts(['mydream_weekly_regular']);
      setCurrentPrice(res[0].priceString);
    })();
  }, []);

  if (isActive) {
    return null;
  }

  return (
    <Grid
      height={270}
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
      <Grid space="sm" justfity="space-between" flex={1} padding={25}>
        <Grid space="sm" justfity="center">
          <Typography numberOfLines={2} weight="extra-bold" variant="title-2">
            {title || 'MyDream AI – Premium'}
          </Typography>
          <Grid
            style={{ shadowColor: '#fff', shadowOpacity: 0.7, shadowRadius: 2, shadowOffset: { height: 0, width: 0 } }}
          >
            <Typography variant="footnote" weight="bold">
              • 3-day free trial
            </Typography>
            <Typography variant="footnote">• Decode every dream in seconds</Typography>
            <Typography variant="footnote">• High-fidelity voice capture (≈ 95 % accuracy)</Typography>
            <Typography variant="footnote">• Continue your dream with 1 tap</Typography>
            <Typography variant="footnote">• {getWeeklyPurchaseCount()} people unlocked insights this week</Typography>
          </Grid>
        </Grid>
        <Grid gap={2} width="80%" flex={1} justfity="flex-end">
          <Button style={{ paddingVertical: 9 }} onPress={onPress}>
            Start 3-day free trial
          </Button>
          <Typography marginLeft={20} variant="caption-1" color="disabled">
            Then {currentPrice} per week
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
