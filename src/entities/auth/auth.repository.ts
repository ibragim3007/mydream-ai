import { apiService, authService } from '@/shared/api/api';
import { create } from 'zustand';

interface State {
  token: string | null;
  isHydrated: boolean;
}

interface Actions {
  setToken: (token: string | null) => void;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<State & Actions>(set => {
  return {
    token: null,
    isHydrated: false,

    setToken: async (token: string | null) => {
      if (token) {
        await authService.setToken(token);
        apiService.setAuthorizationHeader(token);
      } else {
        await authService.removeToken();
        apiService.deleteAuthorizationHeader();
      }

      set({ token: token });
    },

    hydrate: async () => {
      const storedToken = await authService.getToken();
      if (storedToken) {
        set({ token: storedToken, isHydrated: true });
      }
    },

    logout: async () => {
      apiService.deleteAuthorizationHeader();
      await authService.removeToken();
      set({ token: null, isHydrated: false });
    },
  };
});
