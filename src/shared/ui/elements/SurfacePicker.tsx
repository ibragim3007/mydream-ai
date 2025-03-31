import { useTheme } from '@/shared/hooks/useTheme';
import AnimTouchWrapper from '../animations/AnimTouchWrapper';
import { PaperPressable } from '../layout/Paper';
import Typography from '../typography/Typography';

interface SurfacePickerProps<T> {
  isPicked: boolean;
  onChange: (value: T) => void;
  item: T;
  label: string;
}
export default function SurfacePicker<T>({ isPicked, onChange, item, label }: SurfacePickerProps<T>) {
  const colors = useTheme();
  return (
    <AnimTouchWrapper>
      <PaperPressable
        style={{
          backgroundColor: isPicked ? colors.background.active : colors.background.neutral,
        }}
        onPress={() => onChange(item)}
      >
        <Typography textAlign="center" weight="bold">
          {label}
        </Typography>
      </PaperPressable>
    </AnimTouchWrapper>
  );
}
