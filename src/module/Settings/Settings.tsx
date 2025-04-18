import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '@/shared/ui/grid/Grid';
import WrapIconInPressable from '@/shared/ui/wrapper/WrapIconInPressable';
import Ionicons from '@expo/vector-icons/Ionicons';
import Superwall from '@superwall/react-native-superwall';

export default function Settings() {
  const colors = useTheme();
  const handleSub = async () => {
    await Superwall.shared.register({ placement: 'campaign_trigger' });
  };

  return (
    <Grid row justfity="flex-end">
      <WrapIconInPressable onPress={handleSub}>
        <Ionicons name="settings" size={24} color={colors.text.primary} />
      </WrapIconInPressable>
    </Grid>
  );
}
