import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';

interface DreamProgressBarProps {
  current: number;
  total: number;
}

export default function DreamProgressBar({ current, total }: DreamProgressBarProps) {
  const colors = useTheme();
  return (
    <Grid space="sm">
      <Grid flex={1} height={8}>
        <Grid
          style={{ borderRadius: 40, position: 'absolute', zIndex: 10 }}
          width={`${(current / total) * 100}%`}
          height="100%"
          color={colors.text.primary}
        />
        <Grid style={{ borderRadius: 40 }} height="100%" color={'#ffffff20'} />
      </Grid>
      <Typography color="secondary" variant="footnote">{`${current} / ${total}`}</Typography>
    </Grid>
  );
}
