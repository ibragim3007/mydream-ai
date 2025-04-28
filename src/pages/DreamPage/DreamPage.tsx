import { useContinueDream, useGetDreamById } from '@/entities/dream/dream.repository';
import { getDreamAnalysisResponse } from '@/entities/dream/helpers/getDreamResponse';

import { GeneralFeedback } from '@/entities/feedback';
import { HORIZONTAL_PADDINGS, PLACEMENTS } from '@/shared/config/constants/constants';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useTheme } from '@/shared/hooks/useTheme';
import { animationEngine } from '@/shared/service/animation.service';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import Button from '@/shared/ui/buttons/Button';
import CardPaper from '@/shared/ui/elements/CardPaper';
import HeaderPlaceholder from '@/shared/ui/elements/HeaderPlaceholder';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Superwall from '@superwall/react-native-superwall';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import HeaderDream from './ui/HeaderDream';
import Interpretations from './ui/Interpretations';
import LoadingSkeleton from './ui/LoadingSkeleton';
import Participants from './ui/Participants';

export default function DreamPage() {
  const params = useLocalSearchParams<{ id: string }>();
  const colors = useTheme();
  const { isActive } = useSubscription();
  const [analysis, setAnalysis] = useState<SleepDataResponse | undefined>(undefined);
  const { data, isLoading, isError, isFetching } = useGetDreamById(params.id);
  const { continueDreamFunction, isPending } = useContinueDream();

  const handleContinueDream = async () => {
    if (!isActive) {
      Superwall.shared.register({
        placement: PLACEMENTS.campaign_trigger,
      });

      return;
    }
    if (data) {
      await continueDreamFunction(data.id);
    }
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (data) {
      const analysis = getDreamAnalysisResponse(data.analyzeText);
      setAnalysis(analysis);
    }
  }, [isLoading, isFetching, data]);

  if (isLoading) {
    return <LoadingSkeleton />;
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
      <HeaderPlaceholder />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SafeWrapper style={{ paddingHorizontal: 0 }}>
          <Animated.View entering={animationEngine.fadeInUp(0)}>
            <Grid space="lg">
              <HeaderDream dream={data} />

              <Participants analysis={analysis} />

              <Grid width="100%" space="md" paddingHorizontal={HORIZONTAL_PADDINGS}>
                <Typography weight="extra-bold" variant="title-2">
                  General info
                </Typography>
                <CardPaper
                  width="100%"
                  title={'Input'}
                  date={new Date(data.createdAt).toDateString()}
                  text={data.inputText}
                />

                {data.continuation ? (
                  <Animated.View entering={animationEngine.fadeInUp(0)}>
                    <CardPaper title="Continuation" text={data.continuation} />
                  </Animated.View>
                ) : (
                  <Button
                    onPress={handleContinueDream}
                    disabled={isFetching}
                    leftIcon={
                      !isActive ? (
                        <FontAwesome name="lock" size={24} color={colors.text.white} />
                      ) : (
                        <AntDesign
                          name="arrowdown"
                          size={24}
                          color={isFetching ? colors.text.primary : colors.text.white}
                        />
                      )
                    }
                  >
                    {isPending ? 'Loading...' : 'Finish the dream'}
                  </Button>
                )}
              </Grid>

              <Interpretations analysis={analysis} />
              <Grid marginVertical={60}>
                <GeneralFeedback title="Did you like the interpretations?" />
              </Grid>
            </Grid>
          </Animated.View>
        </SafeWrapper>
      </ScrollView>
    </PageWrapper>
  );
}
