import { useTheme } from '@/shared/hooks/useTheme';
import Grid from '@/shared/ui/grid/Grid';
import WrapIconInPressable from '@/shared/ui/wrapper/WrapIconInPressable';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';

export default function Settings() {
  const colors = useTheme();
  const handleSub = async () => {
    router.push('/screens/settingsScreen');
  };

  return (
    <Grid row justfity="flex-end">
      <WrapIconInPressable onPress={handleSub}>
        <Ionicons name="settings" size={24} color={colors.text.primary} />
      </WrapIconInPressable>
    </Grid>
  );
}
