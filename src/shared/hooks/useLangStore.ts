import { getDeviceLanguage } from '@/shared/helpers/getDeviceLanguage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware'; // ⬅︎ сохраняем язык между запусками
import { immer } from 'zustand/middleware/immer';
import i18n from '../providers/i18n';
import { zustandMMKVStorageLang } from './lang.storage';

interface State {
  lang: string;
}
interface Actions {
  setLang: (lang: string) => void;
}

/**
 * Глобальный стор приложения
 * Сохраняем только выбранный язык; сами переводы живут в i18next
 */
export const useLang = create<State & Actions>()(
  persist(
    immer(set => {
      // язык устройства по умолчанию
      const deviceLang = getDeviceLanguage();
      i18n.changeLanguage(deviceLang); // синхронизируем i18n при старте

      return {
        lang: deviceLang,

        setLang: lang =>
          set(state => {
            if (state.lang !== lang) {
              state.lang = lang; // обновляем стор
              i18n.changeLanguage(lang); // переключаем i18n
            }
          }),
      };
    }),
    {
      name: 'lang', // ключ в SecureStore/AsyncStorage
      storage: createJSONStorage(() => zustandMMKVStorageLang), // ваша обёртка на SecureStore
    },
  ),
);
