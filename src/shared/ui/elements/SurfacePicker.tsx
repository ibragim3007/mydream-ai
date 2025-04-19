import { useTheme } from '@/shared/hooks/useTheme';
import AnimTouchWrapper from '../animations/AnimTouchWrapper';
import { PaperPressable } from '../layout/Paper';
import Typography from '../typography/Typography';
import Grid, { GridProps } from '../grid/Grid';
import { useVibration } from '@/shared/hooks/useVibration';

interface SurfacePickerProps<T> extends GridProps {
  isPicked: boolean;
  onChange: (value: T) => void;
  item: T;
  label: string;
  header?: React.ReactNode;
}
export default function SurfacePicker<T>({ isPicked, header, onChange, item, label, ...props }: SurfacePickerProps<T>) {
  const colors = useTheme();
  const { vibrateSelection } = useVibration();
  const onChangeWrapper = () => {
    onChange(item);
    vibrateSelection();
  };

  return (
    <AnimTouchWrapper>
      <PaperPressable
        {...props}
        onPress={onChangeWrapper}
        color={isPicked ? colors.text.primary : 'transparent'}
        style={{
          borderColor: isPicked ? colors.accent.primary : colors.background.neutral,
        }}
      >
        <Grid space="sm">
          {header && (
            <Grid width="100%" align="center">
              {header}
            </Grid>
          )}
          <Typography variant="callout" textAlign="center" color={isPicked ? 'white' : 'primary'} weight="bold">
            {label}
          </Typography>
        </Grid>
      </PaperPressable>
    </AnimTouchWrapper>
  );
}
