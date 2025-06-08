import { useAnalyzePastDreams, useGetProgressOnGeneralAnalysis } from '@/entities/dream/dream.repository';
import { PLACEMENTS } from '@/shared/config/constants/constants';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useTheme } from '@/shared/hooks/useTheme';
import LoaderIndicator from '@/shared/ui/elements/LoaderIndicator';
import { GridPressable } from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import Superwall from '@superwall/react-native-superwall';
import Animated from 'react-native-reanimated';

export default function GeneralAnalyzeButton() {
  const colors = useTheme();
  const { isActive } = useSubscription();
  const { data, isLoading } = useGetProgressOnGeneralAnalysis();
  const { analyzePastDreamsFunction } = useAnalyzePastDreams();

  const onHandlePress = () => {
    if (!isActive) {
      Superwall.shared.register({
        placement: PLACEMENTS.analyze_button_press,
      });
      return;
    }
    analyzePastDreamsFunction();
  };

  // Values
  const current = Number(data?.current ?? 0);
  const total = Number(data?.total ?? 0);

  // Calculate progress width and button state
  const progressWidth = (current / total) * 100;

  const isPressable = current === total && total !== 0;

  const buttonString = `${String(current ?? 0)}/${String(total ?? 0)} Analyze`;

  if (isLoading || !data) {
    return null;
  }

  if (current === 0) {
    return null;
  }

  return (
    <GridPressable
      disabled={!isPressable}
      onPress={onHandlePress}
      color={'#ffffff28'}
      paddingHorizontal={20}
      paddingVertical={10}
      align="center"
      height={50}
      justfity="center"
      style={{
        borderRadius: 20,
        overflow: 'hidden',
      }}
    >
      {isLoading ? (
        <LoaderIndicator />
      ) : (
        <>
          <Typography weight="bold" variant="title-3">
            {buttonString}
          </Typography>
          <Animated.View
            style={{
              height: 60,
              position: 'absolute',
              width: `${progressWidth}%`,
              backgroundColor: colors.text.primary,
              justifyContent: 'center',
              left: 0,
              overflow: 'hidden',
            }}
          >
            <Typography
              style={{ position: 'absolute', left: 130, zIndex: 20 }}
              weight="bold"
              color="white"
              variant="title-3"
            >
              {buttonString}
            </Typography>
          </Animated.View>
        </>
      )}
    </GridPressable>
  );
}
