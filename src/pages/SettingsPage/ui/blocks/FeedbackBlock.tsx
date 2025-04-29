import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import SettingItem from '../../../../shared/ui/elements/SettingsItem';
import { useTheme } from '@/shared/hooks/useTheme';
import { Linking } from 'react-native';
import { EMAIL_FEEDBACK } from '@/shared/config/constants/constants';

export default function FeedbackBlock() {
  const colors = useTheme();
  const subject = 'Feedback from MyDream';
  const bugSubject = 'Bug report from MyDream';
  const featureSubject = 'Feature request from MyDream';
  return (
    <GroupCard title="Reach us">
      <SettingItem
        onPress={() => Linking.openURL(`mailto:${EMAIL_FEEDBACK}?subject=${subject}`)}
        leftIcon={<Feather name="mail" size={24} color={colors.text.primary} />}
        title="Send us an email"
        prefix={EMAIL_FEEDBACK}
      />
      <SettingItem
        onPress={() => Linking.openURL(`mailto:${EMAIL_FEEDBACK}?subject=${bugSubject}`)}
        leftIcon={<Feather name="repeat" size={24} color={colors.text.primary} />}
        title="Report a bug"
      />
      <SettingItem
        onPress={() => Linking.openURL(`mailto:${EMAIL_FEEDBACK}?subject=${featureSubject}`)}
        leftIcon={<Feather name="feather" size={24} color={colors.text.primary} />}
        title="Request a feature"
      />
    </GroupCard>
  );
}
