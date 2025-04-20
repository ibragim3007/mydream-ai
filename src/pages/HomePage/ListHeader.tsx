import MoonImage from '@/assets/icons/moonImage2.png';
import { AddDreamButton } from '@/module/AddDreamButton';
import { Settings } from '@/module/Settings';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';

export default function ListHeader() {
  return (
    <Grid gap={50} marginBottom={20}>
      <Grid>
        <Settings />
        <Grid space="lg">
          <Grid space="sm">
            <Grid space="md" row align="center">
              <Typography variant="largeTitle" weight="bold">
                Hi, Dreamer!
              </Typography>
              <Image source={MoonImage} style={{ height: 50, width: 50 }} />
            </Grid>
            <Typography>The better you describe your dream, the better the interpretation will be.</Typography>
          </Grid>
          <AddDreamButton />
          {/* <CreateDreamInput /> */}
        </Grid>
      </Grid>
      <Typography weight="extra-bold" variant="title-2">
        Recently added
      </Typography>
      {/* <ClearCacheButton /> */}
    </Grid>
  );
}
