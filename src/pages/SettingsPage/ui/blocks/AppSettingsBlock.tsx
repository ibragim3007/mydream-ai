import { useAuth } from '@/entities/auth/auth.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Foundation from '@expo/vector-icons/Foundation';
import { router } from 'expo-router';
import SettingItem from '../../../../shared/ui/elements/SettingsItem';

import { LanguagePicker } from '@/module/LanguagePicker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AppSettingsBlock() {
  const { user } = useAuth();
  const colors = useTheme();

  const onPressChangeName = () => {
    router.navigate('/screens/settings/nameUpdateScreen');
  };

  const onPressChangeCodeProtection = () => {
    router.navigate('/screens/settings/codeProtection');
  };

  return (
    <GroupCard title="App Preferences">
      <SettingItem
        onPress={onPressChangeName}
        title="Name"
        leftIcon={<Foundation name="text-color" size={24} color={colors.text.primary} />}
        rightPrefix={user?.displayName}
      />

      <SettingItem
        onPress={onPressChangeCodeProtection}
        leftIcon={<MaterialIcons name="password" size={23} color={colors.text.primary} />}
        title="Code protection"
      />

      <LanguagePicker />
    </GroupCard>
  );
}
