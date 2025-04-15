import { useGetDreamById } from '@/entities/dream/dream.repository';
import { getDreamAnalysisResponse } from '@/entities/dream/helpers/getDreamResponse';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import Paper from '@/shared/ui/layout/Paper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { router, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, ScrollView } from 'react-native';

export default function DreamPage() {
  const params = useLocalSearchParams<{ id: string }>();
  const { data, isLoading, isError } = useGetDreamById(params.id);
  const goBack = () => {
    router.back();
  };

  const analysis = getDreamAnalysisResponse(data?.analyzeText || '');

  if (isLoading) {
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

  return (
    <PageWrapper>
      <ScrollView>
        <SafeWrapper>
          <Grid space="sm">
            <Grid row align="flex-start" space="sm">
              <GoBackButton onPress={goBack} />
            </Grid>
            <Grid space="sm">
              <Typography weight="bold" variant="title-1">
                {data.title}
              </Typography>
              <Typography variant="headline" weight="bold">
                Summary
              </Typography>
              <Typography variant="callout">{analysis.summary}</Typography>
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
