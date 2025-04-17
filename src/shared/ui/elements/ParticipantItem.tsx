import { useTheme } from '@/shared/hooks/useTheme';
import { normalizedSize } from '@/shared/utils/size';
import Grid from '../grid/Grid';
import Typography from '../typography/Typography';

interface ParticipantItemProps {
  name: string;
  role: string;
}

export default function ParticipantItem({ name, role }: ParticipantItemProps) {
  const colors = useTheme();

  return (
    <Grid
      color="#fff"
      // height={90}
      style={{ maxWidth: normalizedSize(220), borderRadius: colors.styles.borderRadius }}
      paddingVertical={15}
      paddingHorizontal={15}
      // justfity="center"
    >
      <Grid align="center" space="sm" row>
        <Typography weight="bold" color="white" variant="callout">
          {name}
        </Typography>
        {/* <Ionicons name="person-outline" size={16} color={colors.text.white} /> */}
      </Grid>
      <Typography variant="footnote" color="white">
        {role}
      </Typography>
    </Grid>
  );
}
