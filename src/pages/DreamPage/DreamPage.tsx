import { useGetDreamById } from '@/entities/dream/dream.repository';
import { getDreamAnalysisResponse } from '@/entities/dream/helpers/getDreamResponse';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Paper from '@/shared/ui/layout/Paper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import MoonImage from '@/assets/icons/moonImage2.png';
import CardPaper from '@/shared/ui/elements/CardPaper';
import UserAvatar from '@/entities/auth/ui/UserAvatar';

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
      <PageWrapper background="dark">
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
      <ScrollView>
        <SafeWrapper>
          <Grid space="lg">
            <Grid>
              <Grid row align="center" justfity="space-between" space="lg">
                <GoBackButton onPress={goBack} />
                <Typography textAlign="center" variant="title-3" weight="extra-bold">
                  Dream
                </Typography>
                <Grid style={{ opacity: 0 }}>
                  <GoBackButton onPress={() => {}} />
                </Grid>
              </Grid>
              <Grid align="center" space="lg">
                <Image source={MoonImage} style={{ height: 140, width: 140 }} />
                <Grid space="sm" align="center">
                  <Typography weight="bold" variant="title-1">
                    {data.title}
                  </Typography>
                  <UserAvatar />
                </Grid>
                <CardPaper title={'Detail'} date={new Date(data.createdAt).toDateString()} text={data.inputText} />
              </Grid>
            </Grid>
            <Grid space="md">
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
          </Grid>
        </SafeWrapper>
      </ScrollView>
    </PageWrapper>
  );
}
