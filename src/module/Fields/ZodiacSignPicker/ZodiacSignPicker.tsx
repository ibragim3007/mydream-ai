import { zodiacSignsMock } from '@/entities/userTags/mock/zodiacSignsMock';
import { IZodiacItem } from '@/entities/userTags/types/types';
import { useVibration } from '@/shared/hooks/useVibration';
import SurfacePicker from '@/shared/ui/elements/SurfacePicker';
import Grid from '@/shared/ui/grid/Grid';

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
        <Grid key={item.id} width="31%">
          <SurfacePicker
            height={50}
            justfity="center"
            isPicked={value?.id == item.id}
            label={item.name}
            item={item}
            onChange={item => onChahgeZodiacSign(item)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
