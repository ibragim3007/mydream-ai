/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NativeModules, Platform } from 'react-native';

import { LANGUAGE } from '../types/globalTypes';
import { DEFAUTL_LANGUAGE } from '../config/constants/constants';

export const getDeviceLanguage = (): LANGUAGE => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const deviceLanguage: string = (
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
      : DEFAUTL_LANGUAGE
  ).toLowerCase();

  const isAnySeparates_ = deviceLanguage.split('_');
  const isAnySeparatesDefis = deviceLanguage.split('-');
  if (isAnySeparatesDefis.length > 1) return isAnySeparatesDefis[0] as LANGUAGE;
  else if (isAnySeparates_.length > 1) return isAnySeparates_[0] as LANGUAGE;

  return deviceLanguage as LANGUAGE;
};
