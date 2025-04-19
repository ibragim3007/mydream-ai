import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import SettingItem from './SettingsItem';

export default function LogOutBlock() {
  const colors = useTheme();
  return (
    <GroupCard title="Account info">
      <SettingItem
        leftIcon={<Feather name="message-circle" size={24} color={colors.text.primary} />}
        title="Contact us"
        rightIcon={<Feather name="arrow-right" size={24} color={colors.text.secondary} />}
        // onPress={onContactUs}
      />
    </GroupCard>
  );
}
