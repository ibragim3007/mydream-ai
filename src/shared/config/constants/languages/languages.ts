interface IDisplayLanguage {
  label: string;
  code: string;
  flag: string;
}

export const languages: IDisplayLanguage[] = [
  { label: 'English', code: 'en', flag: '🇬🇧' },
  { label: 'Russian', code: 'ru', flag: '🇷🇺' },
  { label: 'Ukrainian', code: 'uk', flag: '🇺🇦' },
  { label: 'German', code: 'de', flag: '🇩🇪' },
];
