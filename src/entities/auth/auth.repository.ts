import { getAppToken } from '@/shared/service/appId.service';
import { create } from 'zustand';
import { InitUserType } from './auth.types';
import { getDeviceLanguage } from '@/shared/helpers/getDeviceLanguage';
import { init } from '@/shared/api/entities/auth/api.auth';

interface State {
  token: string | null;
  isHydrated: boolean;
}

interface Actions {
  setToken: (token: string | null) => void;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;

  initUser: (body: InitUserType) => Promise<void>;
}

export const useAuth = create<State & Actions>(set => {
  return {
    token: null,
    isHydrated: false,

    initUser: async (body: InitUserType) => {
      const appToken = await getAppToken();
      const local = getDeviceLanguage();

      await init({
        appToken: appToken,
        displayName: body.displayName,
        local: local,
      });
    },
  };
});
