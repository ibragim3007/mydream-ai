import { genderMock } from '@/entities/userTags/mock/genderMock';
import { IGenderItem } from '@/entities/userTags/types/types';
import SurfacePicker from '@/shared/ui/elements/SurfacePicker';
import Grid from '@/shared/ui/grid/Grid';

interface GenderPickerProps {
  onChange: (gender: IGenderItem) => void;
  value?: IGenderItem;
}

export default function GenderPicker({ onChange, value }: GenderPickerProps) {
  return (
    <Grid row space="md" wrap justfity="center">
      {genderMock.map(item => (
        <Grid key={item.id} width="30%">
          <SurfacePicker
            paddingHorizontal={0}
            height={70}
            justfity="center"
            isPicked={value?.id === item.id}
            item={item}
            key={item.id}
            label={item.name}
            onChange={item => onChange(item)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
