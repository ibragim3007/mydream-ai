interface IDisplayLanguage {
  label: string;
  code: string;
  flag: string;
}

export const languages: IDisplayLanguage[] = [
  { label: 'English', code: 'en', flag: '🇬🇧' },
  { label: 'Русский', code: 'ru', flag: '🇷🇺' },
  { label: 'Українська', code: 'uk', flag: '🇺🇦' },
  { label: 'Deutsch', code: 'de', flag: '🇩🇪' },
];
