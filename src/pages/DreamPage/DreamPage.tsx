import { useGetDreamById } from '@/entities/dream/dream.repository';
import { getDreamAnalysisResponse } from '@/entities/dream/helpers/getDreamResponse';

import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { useTheme } from '@/shared/hooks/useTheme';
import { animationEngine } from '@/shared/service/animation.service';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import CardPaper from '@/shared/ui/elements/CardPaper';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import HeaderDream from './ui/HeaderDream';
import Interpretations from './ui/Interpretations';

export default function DreamPage() {
  const params = useLocalSearchParams<{ id: string }>();
  const colors = useTheme();
  const [analysis, setAnalysis] = useState<SleepDataResponse | undefined>(undefined);
  const { data, isLoading, isError, isFetching } = useGetDreamById(params.id);
  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (data) {
      const analysis = getDreamAnalysisResponse(data.analyzeText);
      setAnalysis(analysis);
    }
  }, [isLoading, isFetching, data]);

  if (isLoading || isFetching) {
    return (
      <PageWrapper>
        <SafeWrapper>
          <Typography weight="bold">Getting your dream information...</Typography>
          <ActivityIndicator />
        </SafeWrapper>
      </PageWrapper>
    );
  }

  if (isError) {
    return (
      <PageWrapper>
        <SafeWrapper>
          <Typography weight="bold">Error loading dream information</Typography>
        </SafeWrapper>
      </PageWrapper>
    );
  }

  if (!data) {
    return (
      <PageWrapper>
        <SafeWrapper>
          <Typography weight="bold">No dream information available</Typography>
        </SafeWrapper>
      </PageWrapper>
    );
  }

  if (!analysis) {
    return (
      <PageWrapper>
        <SafeWrapper>
          <Typography weight="bold">No analysis available</Typography>
        </SafeWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeWrapper style={{ paddingHorizontal: 0 }}>
          <Grid space="lg">
            <Grid space="md">
              <HeaderDream dream={data} />
              <Animated.View entering={animationEngine.zoomInDown(3)}>
                <Grid width="100%" space="sm" paddingHorizontal={HORIZONTAL_PADDINGS / 2}>
                  <CardPaper
                    width="100%"
                    title={'Input'}
                    date={new Date(data.createdAt).toDateString()}
                    text={data.inputText}
                  />
                  {/* <Button leftIcon={<AntDesign name="arrowdown" size={24} color={colors.text.white} />}>
                    Finish the dream
                  </Button> */}
                </Grid>
              </Animated.View>
            </Grid>
            <Animated.View entering={animationEngine.zoomInDown(4)}>
              <Interpretations analysis={analysis} />
            </Animated.View>
          </Grid>
        </SafeWrapper>
      </ScrollView>
    </PageWrapper>
  );
}
