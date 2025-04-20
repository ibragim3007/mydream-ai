import { getDeviceLanguage } from '@/shared/helpers/getDeviceLanguage';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface State {
  local: string;
}

interface Actions {
  setLocal: (local: string) => void;
}

export const useApp = create<State & Actions>()(
  immer(set => {
    const deviceLocal = getDeviceLanguage();
    return {
      local: deviceLocal,
      setLocal: local =>
        set(state => {
          state.local = local;
        }),
    };
  }),
);
