import { generateMockTimings, TimingsBeforeBlock } from '@/entities/useProtection/protection.mock';
import { useProtection } from '@/entities/useProtection/useProtection';
import SettingItem from '@/pages/SettingsPage/ui/SettingsItem';
import { useTheme } from '@/shared/hooks/useTheme';
import LabelSwitch from '@/shared/ui/elements/LabelSwitch';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import Typography from '@/shared/ui/typography/Typography';
import { normalizedSize } from '@/shared/utils/size';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useHeaderHeight } from '@react-navigation/elements';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import RNPickerSelect, { PickerStyle } from 'react-native-picker-select';
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

  const pickerStyle: PickerStyle = {
    inputIOS: {
      paddingVertical: normalizedSize(14),
      paddingHorizontal: normalizedSize(16),
      borderWidth: 1,
      borderColor: '#2F3A59',
      borderRadius: 15,
      color: '#FFFFFF',
      backgroundColor: colors.background.secondary,
      fontSize: normalizedSize(16),
      fontWeight: '500',
    },
    inputIOSContainer: {
      zIndex: 1000,
    },
    inputAndroid: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#2F3A59',
      borderRadius: 12,
      color: '#FFFFFF',
      backgroundColor: '#1C1F2E',
      fontSize: 16,
      fontWeight: '500',
    },
    inputAndroidContainer: {
      zIndex: 1000,
    },
    placeholder: {
      color: '#ffffff', // серый текст
      zIndex: -1,
    },
    iconContainer: {
      top: 16,
      right: 12,
    },
  };

  const [selectedLanguage, setSelectedLanguage] = useState();
  const mocks = generateMockTimings(TimingsBeforeBlock, 'minutes');
  const { setBlockTime } = useProtection();

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
                  value={selectedLanguage}
                  onValueChange={value => setBlockTime(value)}
                  placeholder={{ label: 'Default (1 minute)', value: null }}
                  style={pickerStyle}
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
