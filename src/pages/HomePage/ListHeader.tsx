import AppIcon from '@/assets/icons/app_icon_transparent.png';
import { useGetDreams } from '@/entities/dream/dream.repository';
import { AddDreamButton } from '@/module/AddDreamButton';
import { AudioRecorderButton } from '@/module/AudioRecorderButton';
import { Settings } from '@/module/Settings';
import { SubBlock } from '@/module/SubBlock';
import Grid from '@/shared/ui/grid/Grid';
import Typography from '@/shared/ui/typography/Typography';
import { Image } from 'expo-image';
import LadyAnimation from '@/assets/animations/lady_animation.json';
import LottieView from 'lottie-react-native';
import { normalizedSize } from '@/shared/utils/size';
import ArrowAnimation from '@/assets/animations/arrow.json';

export default function ListHeader() {
  const { data } = useGetDreams();

  const dreamTitle = data?.pages[0][0]?.title || undefined;
  const decodeDream = dreamTitle ? `Decode ${dreamTitle}` : undefined;
  const isDreamsExists = data?.pages[0].length !== 0;
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

              <Image source={AppIcon} style={{ height: normalizedSize(45), width: normalizedSize(45) }} />
            </Grid>
            <Typography>The better you describe your dream, the better the interpretation will be.</Typography>
          </Grid>

          <Grid align="stretch" row space="sm">
            <AddDreamButton />
            <AudioRecorderButton />
            {!isDreamsExists && (
              <LottieView
                autoPlay
                loop={false}
                source={ArrowAnimation}
                style={{
                  width: '100%',
                  height: 130,
                  position: 'absolute',
                  top: 35,
                  zIndex: 100,
                  right: -70,
                  transform: [{ rotate: '0deg' }],
                }}
              />
            )}
          </Grid>
          {/* <CreateDreamInput /> */}
        </Grid>
      </Grid>
      {isDreamsExists && <SubBlock title={decodeDream} />}
      {!isDreamsExists ? (
        <Grid marginTop={50}>
          <Typography weight="extra-bold" variant="title-1">
            Your dreams will be displayed here!
          </Typography>
          <LottieView style={{ width: '100%', height: normalizedSize(290) }} source={LadyAnimation} />
        </Grid>
      ) : (
        <Typography weight="extra-bold" variant="title-1">
          Your dreams!
        </Typography>
      )}
    </Grid>
  );
}
