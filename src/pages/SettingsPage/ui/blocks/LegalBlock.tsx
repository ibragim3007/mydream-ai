import { LINKS } from '@/shared/config/constants/constants';
import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import { Linking } from 'react-native';
import SettingItem from '../SettingsItem';

export default function LegalBlock() {
  const colors = useTheme();

  return (
    <GroupCard title="Legal">
      <SettingItem
        onPress={() => Linking.openURL(LINKS.privacyPolicy)}
        leftIcon={<Feather name="shield" size={24} color={colors.text.primary} />}
        title="Privacy policy"
      />
      <SettingItem
        onPress={() => Linking.openURL(LINKS.termsOfService)}
        leftIcon={<Feather name="book" size={24} color={colors.text.primary} />}
        title="Terms of service"
      />
    </GroupCard>
  );
}
