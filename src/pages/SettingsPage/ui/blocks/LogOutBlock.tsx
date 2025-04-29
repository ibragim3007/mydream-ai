import { useAuth } from '@/entities/auth/auth.repository';
import { useTheme } from '@/shared/hooks/useTheme';
import GroupCard from '@/shared/ui/elements/GroupCard';
import Feather from '@expo/vector-icons/Feather';
import SettingItem from '../../../../shared/ui/elements/SettingsItem';
import { useTranslation } from 'react-i18next';

export default function LogOutBlock() {
  const colors = useTheme();
  const { logout } = useAuth();
  const { t } = useTranslation();

  return (
    <GroupCard title={t('settings-page.account-info')}>
      {/* <SettingItem
        onPress={restorePurchases}
        leftIcon={<Feather name="package" size={24} color={colors.text.primary} />}
        title="Restore purchases"
      /> */}
      {/* <SettingItem leftIcon={<Feather name="user" size={24} color={colors.text.primary} />} title="Account settings" /> */}
      <SettingItem
        danger
        leftIcon={<Feather name="log-out" size={24} color={colors.text.primary} />}
        title={t('settings-page.log-out')}
        onPress={logout}
        rightIcon={<></>}
      />
    </GroupCard>
  );
}
