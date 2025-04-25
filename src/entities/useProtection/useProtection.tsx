import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStoreProtection } from './protection.storage';

interface State {
  codeProtection: number | null;
  biometric: boolean;
}

interface Actions {
  setCodeProtection: (codeProtection: number | null) => void;
  setBiometric: (biometric: boolean) => void;
}

export const useProtection = create<State & Actions>()(
  immer(
    persist(
      set => {
        return {
          codeProtection: null,
          biometric: false,

          setCodeProtection: codeProtection =>
            set(state => {
              state.codeProtection = codeProtection;
            }),

          setBiometric: biometric =>
            set(state => {
              state.biometric = biometric;
            }),
        };
      },
      { name: 'protection-storage', storage: createJSONStorage(() => zustandStoreProtection) },
    ),
  ),
);
