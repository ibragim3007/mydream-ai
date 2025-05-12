import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';
import { useTheme } from '@/shared/hooks/useTheme';
import { SleepDataResponse } from '@/shared/types/globalTypes';
import Logo from '@/shared/ui/elements/Logo/Logo';

import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { LinearGradient } from 'expo-linear-gradient';

interface SnapProps {
  dream: GetDreamDto;
  analysis: SleepDataResponse | undefined;
}

export default function Snap({ dream, analysis }: SnapProps) {
  const colors = useTheme();
  return (
    <LinearGradient colors={['#26175e', '#5f2398']} style={{ padding: 20, borderRadius: colors.styles.borderRadius }}>
      <Grid paddingHorizontal={5} space="lg">
        <Grid space="md">
          <Grid space="sm">
            <Typography color="secondary" variant="subhead">
              {new Date(dream.createdAt).toDateString()}
            </Typography>
            <Typography weight="bold" variant="title-2">
              Мне снился: {dream.title}
            </Typography>
          </Grid>

          <Typography>{analysis?.summary}</Typography>
        </Grid>
        <Grid space="sm">
          <Typography weight="bold" variant="headline">
            Анализ показал
          </Typography>
          <Grid row space="md">
            <Grid height="100%" width={3} color={colors.accent.alert} style={{ borderRadius: 10 }} />
            <Typography>{analysis?.interpretations.esoteric}</Typography>
          </Grid>
        </Grid>
        <Grid align="center">
          <Logo />
        </Grid>
      </Grid>
    </LinearGradient>
  );
}
