import { useGetLastDreamsAnalysis } from '@/entities/dream/dream.repository';
import { localizeDate } from '@/entities/dream/helpers/groupDreamsByDate';
import { useTheme } from '@/shared/hooks/useTheme';
import Chip from '@/shared/ui/elements/Chip';
import TextLine from '@/shared/ui/elements/TextLine';
import Grid from '@/shared/ui/grid/Grid';
import GroupBy from '@/shared/ui/layout/GroupBy';
import Paper from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import { LinearGradient } from 'expo-linear-gradient';

export default function LastDreamAnalysisCard() {
  const { data, isLoading } = useGetLastDreamsAnalysis();
  const colors = useTheme();

  if (isLoading || !data) {
    return null;
  }

  return (
    <LinearGradient colors={data.analysis.colors} style={{ borderRadius: colors.styles.borderRadius }}>
      <Paper color="#214a4ade">
        <Grid space="md">
          <Grid justfity="space-between" row align="center">
            <Typography style={{ flex: 1 }} variant="title-2" weight="bold">
              Анализ снов
            </Typography>
            <Typography variant="callout">{localizeDate(data.createdAt)}</Typography>
          </Grid>
          <Grid space="lg">
            <Grid row space="sm">
              <TextLine />
              <Typography variant="callout">{data.analysis.summary}</Typography>
            </Grid>
            <GroupBy title="Cовет">
              <Typography>{data.analysis.advice}</Typography>
            </GroupBy>
            <GroupBy title="Эмоции">
              <Grid row wrap space="sm">
                {data.analysis.emotions.map((emotion, index) => (
                  <Chip key={index} label={emotion} />
                ))}
              </Grid>
            </GroupBy>
            <GroupBy title="Символы">
              <Grid row space="sm">
                {data.analysis.repeatingElements.map((symbol, index) => (
                  <Chip key={index} label={symbol} />
                ))}
              </Grid>
            </GroupBy>
            <GroupBy title="Психологические аспекты">
              <Grid row space="sm">
                <TextLine />
                <Typography style={{ flex: 1 }}>{data.analysis.psychologicalInsights}</Typography>
              </Grid>
            </GroupBy>
            <GroupBy title="Темы">
              <Grid row space="sm">
                {data.analysis.themes.map((theme, index) => (
                  <Chip key={index} label={theme} />
                ))}
              </Grid>
            </GroupBy>
          </Grid>
        </Grid>
      </Paper>
    </LinearGradient>
  );
}
