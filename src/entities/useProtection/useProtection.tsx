import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStoreProtection } from './protection.storage';
import { generateMockTimings, TimingsBeforeBlock } from './protection.mock';

interface State {
  codeProtection: number | null;
  biometric: boolean;
  blockTime: number;
}

interface Actions {
  setCodeProtection: (codeProtection: number | null) => void;
  setBiometric: (biometric: boolean) => void;
  setBlockTime: (blockTime: number) => void;
}

export const useProtection = create<State & Actions>()(
  immer(
    persist(
      set => {
        return {
          codeProtection: 1,
          biometric: false,
          blockTime: generateMockTimings(TimingsBeforeBlock, 'minutes')[0].value,

          setCodeProtection: codeProtection =>
            set(state => {
              state.codeProtection = codeProtection;
            }),

          setBiometric: biometric =>
            set(state => {
              state.biometric = biometric;
            }),

          setBlockTime: blockTime =>
            set(state => {
              state.blockTime = blockTime;
            }),
        };
      },
      { name: 'protection-storage', storage: createJSONStorage(() => zustandStoreProtection) },
    ),
  ),
);
