import { zodiacSignsMock } from '@/entities /userTags/mock/zodiacSignsMock';
import { useVibration } from '@/shared/hooks/useVibration';
import SurfacePicker from '@/shared/ui/elements/SurfacePicker';
import Grid from '@/shared/ui/grid/Grid';
import { IZodiacItem } from '../../../entities /userTags/types/types';

interface ZodiacSignPickerProps {
  value?: IZodiacItem;
  onChange: (sign: IZodiacItem) => void;
}

export default function ZodiacSignPicker({ onChange, value }: ZodiacSignPickerProps) {
  const { vibrateSelection } = useVibration();
  const onChahgeZodiacSign = (sign: IZodiacItem) => {
    onChange(sign);
    vibrateSelection();
  };

  return (
    <Grid space="sm" row wrap align="center" justfity="center">
      {zodiacSignsMock.map(item => (
        <SurfacePicker
          isPicked={value?.id == item.id}
          label={item.name}
          key={item.id}
          item={item}
          onChange={item => onChahgeZodiacSign(item)}
        />
      ))}
    </Grid>
  );
}
