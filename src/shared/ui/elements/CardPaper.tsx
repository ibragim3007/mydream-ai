import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '../grid/Grid';
import Paper from '../layout/Paper';
import Typography from '../typography/Typography';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface CardPaperProps {
  title: string;
  date: string;
  text: string;
}

export default function CardPaper({ title, date, text }: CardPaperProps) {
  const colors = useTheme();
  return (
    <Grid width="100%">
      <Paper color="#ffffff" paddingVertical={10}>
        <Grid space="md">
          <Grid row justfity="space-between" align="center">
            <Typography color="white" weight="extra-bold">
              {title}
            </Typography>
            <Grid row space="sm" align="center">
              <MaterialIcons name="access-time-filled" size={18} color={colors.text.disabled} />
              <Typography variant="caption-1" color="disabled">
                {date}
              </Typography>
            </Grid>
          </Grid>
          <Typography color="white">{text}</Typography>
        </Grid>
      </Paper>
    </Grid>
  );
}
