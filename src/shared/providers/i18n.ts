import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import ru from '@/locales/ru.json';
import es from '@/locales/es.json';
import de from '@/locales/de.json';

import { getDeviceLanguage } from '../helpers/getDeviceLanguage';

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, ru: { translation: ru }, es: { translation: es }, de: { translation: de } },
  lng: getDeviceLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
