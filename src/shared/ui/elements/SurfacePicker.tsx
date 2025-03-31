import { useTheme } from '@/shared/hooks/useTheme';
import AnimTouchWrapper from '../animations/AnimTouchWrapper';
import { PaperPressable } from '../layout/Paper';
import Typography from '../typography/Typography';
import { GridProps } from '../grid/Grid';
import { useVibration } from '@/shared/hooks/useVibration';

interface SurfacePickerProps<T> extends GridProps {
  isPicked: boolean;
  onChange: (value: T) => void;
  item: T;
  label: string;
}
export default function SurfacePicker<T>({ isPicked, onChange, item, label, ...props }: SurfacePickerProps<T>) {
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
        style={{
          backgroundColor: isPicked ? colors.accent.primary : colors.background.neutral,
          borderColor: isPicked ? colors.accent.primary : colors.background.neutral,
        }}
      >
        <Typography textAlign="center" weight="bold">
          {label}
        </Typography>
      </PaperPressable>
    </AnimTouchWrapper>
  );
}
