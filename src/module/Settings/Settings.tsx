import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '@/shared/ui/grid/Grid';
import WrapIconInPressable from '@/shared/ui/wrapper/WrapIconInPressable';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Settings() {
  const colors = useTheme();
  return (
    <Grid row justfity="flex-end">
      <WrapIconInPressable>
        <Ionicons name="settings" size={24} color={colors.text.primary} />
      </WrapIconInPressable>
    </Grid>
  );
}
