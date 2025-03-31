import { AGE, GENDER } from '@/shared/types/globalTypes';
import { create } from 'zustand';
import { IGoalItem, IZodiacItem } from './types/types';

interface State {
  name?: string;
  gender?: GENDER;
  zodiacSign?: IZodiacItem;
  age?: AGE;
  goals: IGoalItem[];
}

interface Actions {
  updateName: (name: string) => void;
  updateGender: (gender: GENDER) => void;
  updateZodiacSign: (zodiacSign: IZodiacItem) => void;
  updateAge: (age: AGE) => void;
  updateGoals: (goal: IGoalItem[]) => void;
  reset: () => void;
}

export const useUserTags = create<State & Actions>(set => {
  const defaultState: State = {
    name: undefined,
    zodiacSign: undefined,
    gender: undefined,
    age: undefined,
    goals: [],
  };

  return {
    ...defaultState,

    updateName: (name: string) => {
      set(state => ({
        ...state,
        name,
      }));
    },

    updateAge: age => {
      set(state => ({
        ...state,
        age,
      }));
    },

    updateGender: (gender: GENDER) => {
      set(state => ({
        ...state,
        gender,
      }));
    },

    updateZodiacSign: (zodiacSign: IZodiacItem) => {
      set(state => ({
        ...state,
        zodiacSign,
      }));
    },

    updateGoals: (goals: IGoalItem[]) => {
      set(state => ({
        ...state,
        goals,
      }));
    },

    reset: () => {
      set(() => ({
        ...defaultState,
      }));
    },
  };
});
