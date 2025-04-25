import backgroundImage from '@/assets/background/black_background.png';
import backgroundImageStars from '@/assets/background/starts_cloud_background.jpg';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';

import { ImageBackground } from 'expo-image';

interface PageWrapper extends GridProps {
  background?: 'dark' | 'stars';
}

export default function PageWrapper({ background = 'stars', ...props }: PageWrapper) {
  const colors = useTheme();

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#0e1018', '#140d34', '#610e87']}>
      <Grid flex={1} {...props} />
    </LinearGradient>
  );

  return (
    <Grid color={colors.background.primary} style={{ flex: 1, height: '100%' }}>
      <Grid flex={1} {...props} />
    </Grid>
  );

  return (
    <ImageBackground
      style={{ flex: 1, height: '100%', backgroundColor: '#000' }}
      source={background == 'dark' ? backgroundImage : backgroundImageStars}
      contentFit="cover"
    >
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
