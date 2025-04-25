import AppIcon from '@/assets/icons/app_icon_transparent.png';
import { useGetDreams } from '@/entities/dream/dream.repository';
import { AddDreamButton } from '@/module/AddDreamButton';
import { AudioRecorderButton } from '@/module/AudioRecorderButton';
import { Settings } from '@/module/Settings';
import { SubBlock } from '@/module/SubBlock';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';

export default function ListHeader() {
  const { data } = useGetDreams();

  return (
    <Grid gap={50}>
      <Grid>
        <Settings />
        <Grid space="lg">
          <Grid space="sm">
            <Grid space="md" row align="center">
              <Typography variant="largeTitle" weight="bold">
                Hi, Dreamer!
              </Typography>

              <Image source={AppIcon} style={{ height: 50, width: 50 }} />
            </Grid>
            <Typography>The better you describe your dream, the better the interpretation will be.</Typography>
          </Grid>

          <Grid align="stretch" row space="sm">
            <AddDreamButton />
            <AudioRecorderButton />
          </Grid>
          {/* <CreateDreamInput /> */}
        </Grid>
      </Grid>
      <SubBlock />
      {data?.pages[0].length === 0 ? (
        <Typography weight="extra-bold" variant="title-1">
          Your dreams will be displayed here!
        </Typography>
      ) : (
        <Typography weight="extra-bold" variant="title-1">
          Your dreams!
        </Typography>
      )}
      {/* <ClearCacheButton /> */}
    </Grid>
  );
}
