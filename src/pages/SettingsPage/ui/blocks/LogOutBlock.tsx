import { useAuth } from '@/entities/auth/auth.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import SettingItem from '../../../../shared/ui/elements/SettingsItem';

export default function LogOutBlock() {
  const colors = useTheme();
  const { logout } = useAuth();

  return (
    <GroupCard title="Account info">
      {/* <SettingItem
        onPress={restorePurchases}
        leftIcon={<Feather name="package" size={24} color={colors.text.primary} />}
        title="Restore purchases"
      /> */}
      {/* <SettingItem leftIcon={<Feather name="user" size={24} color={colors.text.primary} />} title="Account settings" /> */}
      <SettingItem
        danger
        leftIcon={<Feather name="log-out" size={24} color={colors.text.primary} />}
        title="Log Out"
        onPress={logout}
        rightIcon={<></>}
      />
    </GroupCard>
  );
}
