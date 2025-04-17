import { useTheme } from '@/shared/hooks/useTheme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Grid, { GridProps } from '../grid/Grid';
import Paper from '../layout/Paper';
import Typography from '../typography/Typography';

interface CardPaperProps extends GridProps {
  title: string;
  date?: string;
  text: string;
}

export default function CardPaper({ title, date, text, ...props }: CardPaperProps) {
  const colors = useTheme();

  return (
    <Paper color="#ffffff" paddingHorizontal={8} paddingVertical={10} {...props}>
      <Grid space="md">
        <Grid row justfity="space-between" align="center">
          <Typography color="white" weight="extra-bold">
            {title}
          </Typography>
          <Grid row space="sm" align="center">
            {date && (
              <>
                <MaterialIcons name="access-time-filled" size={18} color={colors.text.disabled} />
                <Typography variant="caption-1" color="disabled">
                  {date}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
        <Typography color="white">{text}</Typography>
      </Grid>
    </Paper>
  );
}
