import { useTheme } from '@/shared/hooks/useTheme';
import { GridPressable } from '@/shared/ui/grid/Grid';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function AudioRecorderButton() {
  const colors = useTheme();
  return (
    <GridPressable
      justfity="center"
      flex={1}
      paddingHorizontal={25}
      width="100%"
      color={colors.text.primary}
      style={{ borderRadius: 15, alignContent: 'stretch', alignSelf: 'stretch', alignItems: 'stretch' }}
    >
      <FontAwesome name="microphone" size={28} color="black" />
    </GridPressable>
  );
}
