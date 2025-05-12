import ImageIcon from '@/assets/icons/app_icon_transparent.png';
import { useTheme } from '@/shared/hooks/useTheme';
import { Image } from 'expo-image';
import Grid from '../../grid/Grid';
import Typography from '../../typography/Typography';

export default function Logo() {
  const colors = useTheme();
  return (
    <Grid
      style={{ borderWidth: 1, borderColor: '#ffffff8f', borderRadius: 20 }}
      row
      wrap
      justfity="center"
      align="center"
      space="md"
      paddingHorizontal={20}
      paddingRight={30}
      paddingVertical={8}
    >
      <Image source={ImageIcon} style={{ width: 40, height: 40 }} />
      <Grid>
        <Typography variant="title-4">Created by </Typography>
        <Typography variant="title-4" weight="extra-bold">
          MyDream – AI
        </Typography>
      </Grid>
    </Grid>
  );
}
