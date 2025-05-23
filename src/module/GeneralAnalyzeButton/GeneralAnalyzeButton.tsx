import { useGetProgressOnGeneralAnalysis } from '@/entities/dream/dream.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import LoaderIndicator from '@/shared/ui/elements/LoaderIndicator';
import { GridPressable } from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import Animated from 'react-native-reanimated';

export default function GeneralAnalyzeButton() {
  const colors = useTheme();
  const { data, isLoading } = useGetProgressOnGeneralAnalysis();

  const progressWidth = ((Number(data?.current) ?? 0) / (Number(data?.total) ?? 1)) * 100;

  return (
    <GridPressable
      color={'#ffffff3c'}
      paddingHorizontal={20}
      paddingVertical={10}
      align="center"
      height={50}
      justfity="center"
      style={{ borderRadius: 20, overflow: 'hidden' }}
    >
      {isLoading ? (
        <LoaderIndicator />
      ) : (
        <>
          <Typography weight="bold" variant="title-3">
            {String(data?.current ?? 0)}/{String(data?.total ?? 0)} Analyze
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
              {String(data?.current ?? 0)}/{String(data?.total ?? 0)} Analyze
            </Typography>
          </Animated.View>
        </>
      )}
    </GridPressable>
  );
}
