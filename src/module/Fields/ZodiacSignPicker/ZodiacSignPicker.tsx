import Grid from '@/shared/ui/grid/Grid';
import { FlatList } from 'react-native';
import { IZodiacItem } from '../../../entities /userTags/types/types';
import ZodiacItem from './ZodiacItem';
import { zodiacSignsMock } from '@/entities /userTags/mock/zodiacSignsMock';

interface ZodiacSignPickerProps {
  value?: IZodiacItem;
  onChange: (sign: IZodiacItem) => void;
}

export default function ZodiacSignPicker({ onChange, value }: ZodiacSignPickerProps) {
  const onChahgeZodiacSign = (sign: IZodiacItem) => {
    onChange(sign);
  };

  return (
    <Grid>
      <FlatList
        data={zodiacSignsMock}
        numColumns={2}
        ItemSeparatorComponent={() => <Grid height={8} />}
        renderItem={({ item }) => (
          <ZodiacItem onChange={onChahgeZodiacSign} isPicked={item.id === value?.id} zodiacItem={item} />
        )}
      />
    </Grid>
  );
}
