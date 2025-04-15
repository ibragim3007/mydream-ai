import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';
import { AuthServiceAsync } from '../service/auth.service';

const API_URL = 'https://dream-lens.up.railway.app';

const apiInstance = axios.create({
  baseURL: API_URL,
});

const queryClientInstance = new QueryClient();

export interface IAuthService {
  getToken: () => Promise<string | null>;
  setToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
}

class ApiService {
  apiUrl: string;
  api: AxiosInstance;
  authService: IAuthService;
  queryClient: QueryClient;

  constructor(body: {
    apiInstance: AxiosInstance;
    API_URL: string;
    authService: IAuthService;
    queryClient: QueryClient;
  }) {
    this.api = body.apiInstance;
    this.apiUrl = body.API_URL;
    this.authService = body.authService;
    this.queryClient = body.queryClient;
  }

  setAuthorizationHeader(token: string) {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  deleteAuthorizationHeader() {
    delete this.api.defaults.headers.common.Authorization;
  }
}

const apiService = new ApiService({
  apiInstance,
  API_URL,
  authService: new AuthServiceAsync(),
  queryClient: queryClientInstance,
});

const { api, apiUrl, authService, queryClient } = apiService;

export { api, apiService, apiUrl, queryClient, authService };
