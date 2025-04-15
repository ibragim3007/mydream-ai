import { SleepDataResponse } from '@/shared/types/globalTypes';

export const getDreamAnalysisResponse = (str: string): SleepDataResponse => {
  return JSON.parse(str) as SleepDataResponse;
};
