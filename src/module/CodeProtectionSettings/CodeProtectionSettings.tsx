import { useProtection } from '@/entities/useProtection/useProtection';
import SettingItem from '@/pages/SettingsPage/ui/SettingsItem';
import { useTheme } from '@/shared/hooks/useTheme';
import LabelSwitch from '@/shared/ui/elements/LabelSwitch';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useHeaderHeight } from '@react-navigation/elements';
import { router } from 'expo-router';

export default function CodeProtectionSettings() {
  const colors = useTheme();
  const { biometric, codeProtection, setCodeProtection, setBiometric } = useProtection(state => state);

  const headerHeight = useHeaderHeight();

  const onPressChangeCodeProtection = () => {
    router.navigate('/screens/settings/codeProtection');
  };

  const onPressEnableProtection = () => {
    if (codeProtection === null) {
      router.navigate('/screens/settings/newPinScreen');
    } else {
      setCodeProtection(null);
    }
  };

  return (
    <PageWrapper>
      <SafeWrapper style={{ paddingTop: headerHeight + 20 }}>
        <Grid space="md">
          <Grid
            style={{ borderRadius: 16 }}
            color={colors.background.secondary}
            row
            padding={12}
            align="center"
            justfity="space-between"
            width="100%"
          >
            <LabelSwitch
              label="Enable code protection"
              value={codeProtection !== null}
              onChange={onPressEnableProtection}
            />
          </Grid>
          <Grid
            style={{ borderRadius: 16 }}
            color={colors.background.secondary}
            row
            padding={12}
            align="center"
            justfity="space-between"
            width="100%"
          >
            <LabelSwitch label="Enable Face ID" value={biometric} onChange={value => setBiometric(value)} />
          </Grid>
          <SettingItem
            onPress={onPressChangeCodeProtection}
            leftIcon={<MaterialIcons name="refresh" size={23} color={colors.text.primary} />}
            title="Change code protection"
          />
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
