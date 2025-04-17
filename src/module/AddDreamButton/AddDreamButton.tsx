import Button from '@/shared/ui/buttons/Button';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
export default function AddDreamButton() {
  const handlePress = () => {
    router.push('/screens/newDreamScreen');
  };

  return (
    <Button
      onPress={handlePress}
      style={{ borderRadius: 15 }}
      leftIcon={<MaterialCommunityIcons name="pencil-plus" size={24} color="black" />}
    >
      Note a new dream
    </Button>
  );
}
