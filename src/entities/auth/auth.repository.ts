import { apiService } from '@/shared/api/api';
import { init } from '@/shared/api/entities/auth/auth.api';
import { getDeviceLanguage } from '@/shared/helpers/getDeviceLanguage';
import { getAppToken } from '@/shared/service/appId.service';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { InitUserType } from './auth.types';
import { Inform } from '@/shared/service/logger.service/logger.service';

interface State {
  appToken: string | null;
}

interface Actions {
  logout: () => Promise<void>;
  initUser: (body: InitUserType) => Promise<void>;
}

export const useAuth = create<State & Actions>(set => {
  return {
    appToken: null,

    //  Только один раз при первом запуске приложения
    //  инициализируем пользователя
    //  и сохраняем токен (приложения) в SecureStore
    //  А также устанавливаем заголовок авторизации
    initUser: async (body: InitUserType) => {
      try {
        const appToken = await getAppToken();
        const local = getDeviceLanguage();

        const res = await init({
          appToken: appToken,
          displayName: body.displayName,
          local: local,
        });
        apiService.setAuthorizationHeader(res.accessToken);

        set({
          appToken: res.user.appToken,
        });
      } catch (error) {
        Inform.error(error);
      }
    },

    // Вызывает очистку токена приложения
    // и удаляет заголовок авторизации
    logout: async () => {
      await SecureStore.deleteItemAsync('token');
      apiService.setAuthorizationHeader('');
      set({ appToken: null });
    },
  };
});
