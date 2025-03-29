import { PaperPressable } from '@/shared/ui/layout/Paper';
import Typography from '@/shared/ui/typography/Typography';
import { IZodiacItem } from '../../../entities /userTags/types/types';

interface ZodiacItemProps {
  onChange: (value: IZodiacItem) => void;
  zodiacItem: IZodiacItem;
  isPicked?: boolean;
}

export default function ZodiacItem({ zodiacItem, isPicked, onChange }: ZodiacItemProps) {
  return (
    <PaperPressable onPress={() => onChange(zodiacItem)}>
      <Typography>{zodiacItem.name}</Typography>
    </PaperPressable>
  );
}
