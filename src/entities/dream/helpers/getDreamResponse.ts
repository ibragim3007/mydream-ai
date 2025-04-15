import { Inform } from '@/shared/service/logger.service/logger.service';
import { SleepDataResponse } from '@/shared/types/globalTypes';

export const getDreamAnalysisResponse = (str: string): SleepDataResponse | undefined => {
  try {
    return JSON.parse(str) as SleepDataResponse;
  } catch (e) {
    Inform.error(e);
  }
};
