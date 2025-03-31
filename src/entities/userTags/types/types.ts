import { GENDER, GOALS, ZODIAC_SIGN } from '@/shared/types/globalTypes';

export interface IZodiacItem {
  id: number;
  name: ZODIAC_SIGN;
}

export interface IGoalItem {
  id: number;
  name: GOALS;
}

export interface IGenderItem {
  id: number;
  name: GENDER;
}
