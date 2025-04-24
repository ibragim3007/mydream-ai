import { useAuth } from '@/entities/auth/auth.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Foundation from '@expo/vector-icons/Foundation';
import SettingItem from '../SettingsItem';
import { router } from 'expo-router';
export default function AppSettingsBlock() {
  const { user } = useAuth();
  const colors = useTheme();

  const onPressChangeName = () => {
    router.navigate('/screens/settings/nameUpdateScreen');
  };

  return (
    <GroupCard title="App Preferences">
      <SettingItem
        onPress={onPressChangeName}
        title="Name"
        leftIcon={<Foundation name="text-color" size={24} color={colors.text.primary} />}
        rightPrefix={user?.displayName}
      />
    </GroupCard>
  );
}
