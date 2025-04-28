import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { normalizedSize } from '@/shared/utils/size';
import { Image } from 'expo-image';
import AppIcon from '@/assets/icons/app_icon_transparent.png';

export default function ListHeaderTitles() {
  return (
    <Grid space="sm">
      <Grid space="md" row align="center">
        <Typography variant="largeTitle" weight="bold">
          Hi, Dreamer!
        </Typography>

        <Image source={AppIcon} style={{ height: normalizedSize(45), width: normalizedSize(45) }} />
      </Grid>
      <Typography>The better you describe your dream, the better the interpretation will be.</Typography>
    </Grid>
  );
}
