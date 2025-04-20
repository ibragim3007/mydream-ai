import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import SettingItem from '../SettingsItem';
import { useTheme } from '@/shared/hooks/useTheme';

export default function FeedbackBlock() {
  const colors = useTheme();
  return (
    <GroupCard title="Reach us">
      <SettingItem
        leftIcon={<Feather name="mail" size={24} color={colors.text.primary} />}
        title="Send us an email"
        prefix="someemail@mail.com"
      />
      <SettingItem leftIcon={<Feather name="repeat" size={24} color={colors.text.primary} />} title="Report a bug" />
      <SettingItem
        leftIcon={<Feather name="feather" size={24} color={colors.text.primary} />}
        title="Request a feature"
      />
    </GroupCard>
  );
}
