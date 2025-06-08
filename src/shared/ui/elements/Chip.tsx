import { useTheme } from '@/shared/hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';
import Typography from '../typography/Typography';

interface ChipProps extends GridProps {
  label: string;
}

export default function Chip({ label, ...props }: ChipProps) {
  const colors = useTheme();
  return (
    <Grid
      style={{ borderRadius: 100 }}
      paddingHorizontal={10}
      paddingVertical={4}
      color={colors.text.primary}
      {...props}
    >
      <Typography variant="callout" weight="medium" color="white">
        {label}
      </Typography>
    </Grid>
  );
}
