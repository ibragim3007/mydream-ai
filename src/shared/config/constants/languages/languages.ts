interface IDisplayLanguage {
  label: string;
  code: string;
  flag: string;
}

export const languages: IDisplayLanguage[] = [
  { label: 'English', code: 'en', flag: '🇬🇧' },
  { label: '中文', code: 'zh', flag: '🇨🇳' }, // Китайский
  { label: 'Español', code: 'es', flag: '🇪🇸' }, // Испанский
  { label: 'Français', code: 'fr', flag: '🇫🇷' }, // Французский
  { label: 'Deutsch', code: 'de', flag: '🇩🇪' }, // Немецкий
  { label: '日本語', code: 'ja', flag: '🇯🇵' }, // Японский
  { label: 'Русский', code: 'ru', flag: '🇷🇺' },
  { label: 'Português', code: 'pt', flag: '🇵🇹' }, // Португальский
  { label: 'Italiano', code: 'it', flag: '🇮🇹' }, // Итальянский
  { label: 'العربية', code: 'ar', flag: '🇸🇦' }, // Арабский
].sort((a, b) => a.code.localeCompare(b.code));
