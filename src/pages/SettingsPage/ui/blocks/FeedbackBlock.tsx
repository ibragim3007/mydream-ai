import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import SettingItem from '../SettingsItem';
import { useTheme } from '@/shared/hooks/useTheme';

export default function FeedbackBlock() {
  const colors = useTheme();
  return (
    <GroupCard title="Feedback">
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
    </GroupCard>
  );
}
