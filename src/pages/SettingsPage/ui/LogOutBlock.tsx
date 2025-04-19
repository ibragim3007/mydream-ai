import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import SettingItem from './SettingsItem';
import { useAuth } from '@/entities/auth/auth.repository';

export default function LogOutBlock() {
  const colors = useTheme();
  const { logout } = useAuth();

  return (
    <GroupCard title="Account info">
      <SettingItem
        leftIcon={<Feather name="message-circle" size={24} color={colors.text.primary} />}
        title="Contact us"
        rightIcon={<Feather name="arrow-right" size={24} color={colors.text.secondary} />}
        // onPress={onContactUs}
      />
      <SettingItem
        leftIcon={<Feather name="phone-forwarded" size={24} color={colors.text.primary} />}
        title="Feedback"
        rightIcon={<Feather name="arrow-right" size={24} color={colors.text.secondary} />}
        // onPress={onContactUs}
      />
      <SettingItem
        leftIcon={<Feather name="phone-forwarded" size={24} color={colors.text.primary} />}
        title="Feedback"
        rightIcon={<Feather name="arrow-right" size={24} color={colors.text.secondary} />}
        // onPress={onContactUs}
      />

      <SettingItem
        danger
        leftIcon={<Feather name="log-out" size={24} color={colors.text.primary} />}
        title="Log Out"
        onPress={logout}
      />
    </GroupCard>
  );
}
