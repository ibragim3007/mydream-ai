import backgroundImage from '@/assets/background/black_background.png';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';

import { ImageBackground } from 'expo-image';

type PageWrapper = GridProps;

export default function PageWrapper({ ...props }: PageWrapper) {
  const colors = useTheme();

  return (
    <ImageBackground style={{ flex: 1 }} source={backgroundImage} contentFit="scale-down">
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
