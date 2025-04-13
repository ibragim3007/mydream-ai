import { api } from '../../api';
import { apiConfig } from '../../apiConfig';
import { InitDtoRequest, InitDtoResponse } from '../../types/auth.types';

export const init = async (payload: InitDtoRequest) => {
  return await api.post<InitDtoRequest, InitDtoResponse>(apiConfig.auth.init, payload);
};

export const me = async () => {
  return await api.get(apiConfig.auth.me);
};
