import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '../grid/Grid';
import { PaperPressable } from '../layout/Paper';
import Typography from '../typography/Typography';
import Feather from '@expo/vector-icons/Feather';

interface DreamItemProps {
  id: string;
  title: string;
  coverImage?: string;
  date: string;
  description: string;
  onPress: (id: string) => void;
}

export default function DreamItem({ id, title, date, description, onPress }: DreamItemProps) {
  const colors = useTheme();
  const onPressHandler = () => {
    onPress(id);
  };

  return (
    <PaperPressable onPress={onPressHandler}>
      <Grid space="md">
        <Grid justfity="space-between" flex={1} row>
          <Grid flex={1} gap={1}>
            <Typography numberOfLines={2} ellipsizeMode="tail" weight="bold" variant="headline">
              {title}
            </Typography>
            <Typography weight="light" variant="caption-1">
              {date}
            </Typography>
          </Grid>
          <Feather name="chevron-right" size={28} color={colors.text.primary} />
        </Grid>
        <Typography weight="light" numberOfLines={5} lineBreakMode="clip">
          {description}
        </Typography>
      </Grid>
    </PaperPressable>
  );
}
