import Grid from '../grid/Grid';
import { PaperPressable } from '../layout/Paper';
import Typography from '../typography/Typography';

interface DreamItemProps {
  id: string;
  title: string;
  coverImage?: string;
  date: string;
  description: string;
  onPress: (id: string) => void;
}

export default function DreamItem({ id, title, date, description, onPress }: DreamItemProps) {
  const onPressHandler = () => {
    onPress(id);
  };

  return (
    <PaperPressable onPress={onPressHandler}>
      <Grid space="md">
        <Grid row justfity="space-between" flex={1}>
          <Typography weight="bold" variant="headline" style={{ flex: 0.8 }}>
            {title}
          </Typography>
          <Typography weight="extra-light" variant="caption-1">
            {date}
          </Typography>
        </Grid>
        <Typography numberOfLines={4} lineBreakMode="clip">
          {description}
        </Typography>
      </Grid>
    </PaperPressable>
  );
}
