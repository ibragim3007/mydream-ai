import { useTheme } from '../../hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';

type PageWrapper = GridProps;

export default function PageWrapper({ ...props }: PageWrapper) {
  const colors = useTheme();
  return <Grid style={{ backgroundColor: props.color || colors.background.primary, flex: 1 }} {...props} />;
}
