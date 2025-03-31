import { zodiacSignsMock } from '@/entities /userTags/mock/zodiacSignsMock';
import Grid from '@/shared/ui/grid/Grid';
import { IZodiacItem } from '../../../entities /userTags/types/types';
import ZodiacItem from './ZodiacItem';
import { useVibration } from '@/shared/hooks/useVibration';

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
        <ZodiacItem key={item.id} onChange={onChahgeZodiacSign} isPicked={item.id === value?.id} zodiacItem={item} />
      ))}
    </Grid>
  );
}
