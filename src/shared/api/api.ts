import axios, { AxiosInstance } from 'axios';
import { AuthServiceAsync } from '../service/auth.service';

const API_URL = 'https://api.example.com';
const apiInstance = axios.create({
  baseURL: API_URL,
});

export interface IAuthService {
  getToken: () => Promise<string | null>;
  setToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
}

class ApiService {
  apiUrl: string;
  api: AxiosInstance;
  authService: IAuthService;

  constructor(body: { apiInstance: AxiosInstance; API_URL: string; authService: IAuthService }) {
    this.api = body.apiInstance;
    this.apiUrl = body.API_URL;
    this.authService = body.authService;
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
});

const { api, apiUrl, authService } = apiService;

export { api, apiUrl, authService, apiService };
