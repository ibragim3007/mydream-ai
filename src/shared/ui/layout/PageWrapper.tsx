import backgroundImageStars from '@/assets/background/starts_cloud_background.jpg';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';

import { ImageBackground } from 'expo-image';

type PageWrapper = GridProps;

export default function PageWrapper({ ...props }: PageWrapper) {
  const colors = useTheme();

  return (
    <ImageBackground style={{ flex: 1 }} source={backgroundImageStars} contentFit="cover">
      <Grid flex={1} {...props} />
    </ImageBackground>
  );

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#052553', '#0E101D']}>
      <Grid flex={1} {...props} />
    </LinearGradient>
  );

  return <Grid style={{ backgroundColor: props.color || colors.background.primary, flex: 1 }} {...props} />;
}
