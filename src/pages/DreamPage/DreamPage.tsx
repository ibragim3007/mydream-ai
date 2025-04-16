import MoonImage from '@/assets/icons/moonImage2.png';
import UserAvatar from '@/entities/auth/ui/UserAvatar';
import { useGetDreamById } from '@/entities/dream/dream.repository';
import { getDreamAnalysisResponse } from '@/entities/dream/helpers/getDreamResponse';
import { DreamSummary } from '@/module/DreamSummary';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import { animationEngine } from '@/shared/service/animation.service';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Paper from '@/shared/ui/layout/Paper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { normalizedSize } from '@/shared/utils/size';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';

export default function DreamPage() {
  const params = useLocalSearchParams<{ id: string }>();
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
            <Grid>
              <Grid
                paddingHorizontal={normalizedSize(HORIZONTAL_PADDINGS)}
                row
                align="center"
                justfity="space-between"
                space="lg"
              >
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
                <Grid align="center" paddingHorizontal={normalizedSize(HORIZONTAL_PADDINGS)}>
                  <Animated.View entering={animationEngine.zoomInDown(1)}>
                    <Image source={MoonImage} style={{ height: 140, width: 140 }} />
                  </Animated.View>
                  <Animated.View entering={animationEngine.zoomInDown(2)}>
                    <Grid space="sm" align="center">
                      <Typography textAlign="center" weight="bold" variant="title-1">
                        {data.title}
                      </Typography>
                      <UserAvatar />
                    </Grid>
                  </Animated.View>
                </Grid>
                <Animated.View style={{ flexDirection: 'row' }} entering={animationEngine.zoomInDown(3)}>
                  <DreamSummary dream={data} analysis={analysis} />
                </Animated.View>
              </Grid>
            </Grid>
            <Animated.View entering={animationEngine.zoomInDown(4)}>
              <Grid paddingHorizontal={normalizedSize(HORIZONTAL_PADDINGS)} space="md">
                <Paper space="sm">
                  <Typography variant="headline" weight="bold">
                    Esoteric
                  </Typography>
                  <Typography>{analysis.interpretations.esoteric}</Typography>
                </Paper>
                <Paper space="sm">
                  <Typography variant="headline" weight="bold">
                    Scientific
                  </Typography>
                  <Typography>{analysis.interpretations.scientific}</Typography>
                </Paper>
                <Paper space="sm">
                  <Typography variant="headline" weight="bold">
                    Self_development
                  </Typography>
                  <Typography>{analysis.interpretations.self_development}</Typography>
                </Paper>
              </Grid>
            </Animated.View>
          </Grid>
        </SafeWrapper>
      </ScrollView>
    </PageWrapper>
  );
}
