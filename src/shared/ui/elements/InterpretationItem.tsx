import { Image } from 'expo-image';
import Grid from '../grid/Grid';
import Typography from '../typography/Typography';
import { LinearGradient } from 'expo-linear-gradient';

interface InterpretationItemProps {
  title: string;
  text: string;
  image: string;
  isBlocked: boolean;
}

const ITEM_HEIGHT = 120;

export default function InterpretationItem({ title, text, image, isBlocked }: InterpretationItemProps) {
  return (
    <Grid wrap height={ITEM_HEIGHT} style={{ overflow: 'hidden', borderRadius: 20 }}>
      <Image source={image} style={{ height: ITEM_HEIGHT, width: '100%', position: 'absolute', borderRadius: 20 }} />
      <LinearGradient
        colors={['transparent', '#000000bd']}
        style={{ width: '100%', height: ITEM_HEIGHT, position: 'absolute', borderRadius: 20 }}
      />

      <Grid space="sm" justfity="flex-end" height="95%" wrap paddingVertical={15} paddingHorizontal={20}>
        <Typography weight="bold" variant="headline">
          {title}
        </Typography>
        {/* <Typography>{text}</Typography> */}
      </Grid>
    </Grid>
  );
}
