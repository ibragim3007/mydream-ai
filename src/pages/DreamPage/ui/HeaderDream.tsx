import UserAvatar from '@/entities/auth/ui/UserAvatar';
import { GetDreamDto } from '@/shared/api/entities/dream/dream.types';
import { HORIZONTAL_PADDINGS } from '@/shared/config/constants/constants';
import GoBackButton from '@/shared/ui/buttons/GoBackButton';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { router } from 'expo-router';
import HeaderImage from './HeaderImage';

interface HeaderDreamProps {
  dream: GetDreamDto;
}

export default function HeaderDream({ dream }: HeaderDreamProps) {
  const goBack = () => {
    router.back();
  };
  return (
    <Grid>
      <Grid paddingHorizontal={HORIZONTAL_PADDINGS} row align="center" justfity="space-between" space="lg">
        <GoBackButton onPress={goBack} />
        <Typography textAlign="center" variant="title-3" weight="extra-bold">
          Dream
        </Typography>
        <Grid style={{ opacity: 0 }}>
          <GoBackButton onPress={() => {}} />
        </Grid>
      </Grid>
      <Grid align="center" space="lg">
        <Grid align="center" paddingHorizontal={HORIZONTAL_PADDINGS}>
          <HeaderImage />
          <Grid space="sm" align="center">
            <Typography textAlign="center" weight="bold" variant="title-1">
              {dream.title}
            </Typography>
            <UserAvatar />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
