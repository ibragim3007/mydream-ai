import { useTheme } from '@/shared/hooks/useTheme';
import { useVibration } from '@/shared/hooks/useVibration';
import Button from '@/shared/ui/buttons/Button';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

export default function AddDreamButton() {
  const colors = useTheme();
  const { vibrate } = useVibration();
  const handlePress = () => {
    vibrate();
    router.push('/screens/newDreamScreen');
  };

  return (
    <Button
      onPress={handlePress}
      style={{ borderRadius: 15, flex: 1 }}
      leftIcon={<MaterialCommunityIcons name="pencil-plus" size={24} color={colors.text.white} />}
    >
      Note a new dream
    </Button>
  );
}
