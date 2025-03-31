import { useTheme } from '@/shared/hooks/useTheme';
import AnimTouchWrapper from '@/shared/ui/animations/AnimTouchWrapper';
import { PaperPressable } from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import { IZodiacItem } from '../../../entities /userTags/types/types';

interface ZodiacItemProps {
  onChange: (value: IZodiacItem) => void;
  zodiacItem: IZodiacItem;
  isPicked?: boolean;
}

export default function ZodiacItem({ zodiacItem, isPicked, onChange }: ZodiacItemProps) {
  const colors = useTheme();
  return (
    <AnimTouchWrapper>
      <PaperPressable
        style={{
          backgroundColor: isPicked ? colors.background.active : colors.background.neutral,
        }}
        onPress={() => onChange(zodiacItem)}
      >
        <Typography weight="bold">{zodiacItem.name}</Typography>
      </PaperPressable>
    </AnimTouchWrapper>
  );
}
