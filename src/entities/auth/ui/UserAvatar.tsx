import Grid from '@/shared/ui/grid/Grid';
import { useAuth } from '../auth.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import Typography from '@/shared/ui/typography/Typography';

export default function UserAvatar() {
  const { user } = useAuth();
  const colors = useTheme();
  return (
    <Grid row space="sm" align="center">
      <Grid
        style={{ borderRadius: 100 }}
        width={30}
        height={30}
        color={colors.background.success}
        align="center"
        justfity="center"
      >
        <Typography weight="bold">{user?.displayName[0]}</Typography>
      </Grid>
      <Grid>
        <Typography>{user?.displayName}</Typography>
      </Grid>
    </Grid>
  );
}
