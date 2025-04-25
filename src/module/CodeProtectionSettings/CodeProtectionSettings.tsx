import { useProtection } from '@/entities/useProtection/useProtection';
import SettingItem from '@/pages/SettingsPage/ui/SettingsItem';
import { useTheme } from '@/shared/hooks/useTheme';
import LabelSwitch from '@/shared/ui/elements/LabelSwitch';
import Grid from '@/shared/ui/grid/Grid';
import PageWrapper from '@/shared/ui/layout/PageWrapper';
import SafeWrapper from '@/shared/ui/layout/SafeWrapper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useHeaderHeight } from '@react-navigation/elements';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { Toast } from 'toastify-react-native';

import { Picker } from '@react-native-picker/picker';

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

  const [selectedLanguage, setSelectedLanguage] = useState();

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
          <RNPickerSelect
            onValueChange={value => console.log(value)}
            items={[
              { label: 'Football', value: 'football' },
              { label: 'Baseball', value: 'baseball' },
              { label: 'Hockey', value: 'hockey' },
            ]}
          />

          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
          {codeProtection !== null && (
            <>
              <SettingItem
                onPress={onPressChangeCodeProtection}
                leftIcon={<MaterialIcons name="refresh" size={23} color={colors.text.primary} />}
                title="Change code protection"
              />
              <RNPickerSelect
                onValueChange={value => console.log(value)}
                items={[
                  { label: 'Football', value: 'football' },
                  { label: 'Baseball', value: 'baseball' },
                  { label: 'Hockey', value: 'hockey' },
                ]}
              />
            </>
          )}
        </Grid>
      </SafeWrapper>
    </PageWrapper>
  );
}
