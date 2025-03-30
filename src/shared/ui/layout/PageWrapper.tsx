import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';

type PageWrapper = GridProps;

export default function PageWrapper({ ...props }: PageWrapper) {
  const colors = useTheme();

  return (
    <LinearGradient style={{ flex: 1 }} colors={['#052553', '#0E101D']}>
      <Grid flex={1} {...props} />
    </LinearGradient>
  );

  return <Grid style={{ backgroundColor: props.color || colors.background.primary, flex: 1 }} {...props} />;
}
