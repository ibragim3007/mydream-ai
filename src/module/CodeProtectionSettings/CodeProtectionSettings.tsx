import { generateMockTimings, TimingsBeforeBlock } from '@/entities/useProtection/protection.mock';
import { useProtection } from '@/entities/useProtection/useProtection';
import SettingItem from '@/shared/ui/elements/SettingsItem';
import { useTheme } from '@/shared/hooks/useTheme';
import { pickerStyle } from '@/shared/styles/picker';
import LabelSwitch from '@/shared/ui/elements/LabelSwitch';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useHeaderHeight } from '@react-navigation/elements';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Toast } from 'toastify-react-native';

export default function CodeProtectionSettings() {
  const colors = useTheme();
  const { biometric, codeProtection, setCodeProtection, setBiometric } = useProtection(state => state);
  const [hasHardware, setHasHardware] = useState(false);

  useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then(hasHardware => {
      setHasHardware(hasHardware);
    });
  }, []);

  const headerHeight = useHeaderHeight();

  const onPressChangeCodeProtection = () => {
    router.navigate('/screens/settings/changePinScreen');
  };

  const handleBiometricChange = (value: boolean) => {
    setBiometric(value);
    Toast.success(
      `Biometric authentication ${value ? 'activated' : 'deactivated'}`,
      'bottom',
      <MaterialCommunityIcons name="face-recognition" size={20} />,
    );
  };

  const onPressEnableProtection = () => {
    if (codeProtection === null) {
      router.navigate('/screens/settings/newPinScreen');
    } else {
      setCodeProtection(null);
    }
  };

  const mocks = generateMockTimings(TimingsBeforeBlock, 'minutes');
  const { blockTime, setBlockTime } = useProtection();

  return (
    <PageWrapper disableGradient>
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
          {hasHardware && (
            <Grid
              style={{ borderRadius: 16 }}
              color={colors.background.secondary}
              row
              padding={12}
              align="center"
              justfity="space-between"
              width="100%"
            >
              <LabelSwitch label="Enable Face ID" value={biometric} onChange={handleBiometricChange} />
            </Grid>
          )}

          {codeProtection !== null && (
            <>
              <Grid space="sm">
                <Typography weight="bold">Block app after (minutes)</Typography>
                <RNPickerSelect
                  darkTheme
                  fixAndroidTouchableBug={true}
                  useNativeAndroidPickerStyle={false}
                  value={blockTime}
                  onValueChange={value => setBlockTime(value)}
                  placeholder={{ label: 'Default (1 minute)', value: null }}
                  style={pickerStyle(colors.background.secondary)}
                  items={mocks}
                />
              </Grid>
              <SettingItem
                onPress={onPressChangeCodeProtection}
                leftIcon={<MaterialIcons name="refresh" size={23} color={colors.text.primary} />}
                title="Change code protection"
              />
            </>
          )}
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
