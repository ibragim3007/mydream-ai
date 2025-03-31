import { withPressable } from '@/shared/hoc/withPressable';
import { useTheme } from '../../hooks/useTheme';
import Grid, { GridProps } from '../grid/Grid';

type PaperProps = GridProps;

export default function Paper({ ...props }: PaperProps) {
  const colors = useTheme();
  return (
    <Grid
      {...props}
      style={[
        {
          padding: 16,
          borderRadius: 15,
          backgroundColor: colors.background.neutral,
          borderWidth: 1,
          borderColor: colors.background.active,
        },
        props.style,
      ]}
    />
  );
}

export const PaperPressable = withPressable(Paper);
