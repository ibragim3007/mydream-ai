import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import SettingItem from '../SettingsItem';
import { router } from 'expo-router';

export default function LegalBlock() {
  const colors = useTheme();

  return (
    <GroupCard title="Legal">
      <SettingItem
        onPress={() => router.push('/screens/legal/policyScreen')}
        leftIcon={<Feather name="shield" size={24} color={colors.text.primary} />}
        title="Privacy policy"
      />
      <SettingItem
        onPress={() => router.push('/screens/legal/termsScreen')}
        leftIcon={<Feather name="book" size={24} color={colors.text.primary} />}
        title="Terms of service"
      />
    </GroupCard>
  );
}
