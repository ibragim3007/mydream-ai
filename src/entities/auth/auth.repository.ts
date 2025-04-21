import { apiService } from '@/shared/api/api';
import { init } from '@/shared/api/entities/auth/auth.api';
import { getDeviceLanguage } from '@/shared/helpers/getDeviceLanguage';
import { getAppToken } from '@/shared/service/appId.service';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';
import { InitUserType, UserType } from './auth.types';
import { Inform } from '@/shared/service/logger.service/logger.service';
import { Alert } from 'react-native';
import { StorageKeys } from '@/shared/config/constants/storageKeys';
import { router } from 'expo-router';
import { errorLogger } from '@/shared/service/logger.service/sentry.service';

interface State {
  user?: UserType;
}

interface Actions {
  logout: () => Promise<void>;
  initUser: (body?: InitUserType) => Promise<void>;
}

export const useAuth = create<State & Actions>(set => {
  return {
    //  Только один раз при первом запуске приложения
    //  инициализируем пользователя
    //  и сохраняем токен (приложения) в SecureStore
    //  А также устанавливаем заголовок авторизации
    initUser: async (body?: InitUserType) => {
      try {
        const appToken = await getAppToken();

        if (!appToken) {
          throw new Error('App token is not defined');
        }

        const local = getDeviceLanguage();

        const res = await init({
          appToken: appToken,
          displayName: body?.displayName || '',
          local: local,
        });

        apiService.setAuthorizationHeader(res.accessToken);

        set({
          user: res.user,
        });
      } catch (error) {
        errorLogger.logError('Error to init user');
        Inform.error(error);
      }
    },

    // Вызывает очистку токена приложения
    // и удаляет заголовок авторизации
    logout: async () => {
      Alert.alert('Logout', "Are you sure you want to log out? And lose all your's data", [
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              await SecureStore.deleteItemAsync(StorageKeys.appToken);
              apiService.setAuthorizationHeader('');
              router.push('/screens/onboarding');
            } catch (error) {
              errorLogger.logError('Error to logout user');
              Inform.error(error);
            }
          },
        },
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    },
  };
});
