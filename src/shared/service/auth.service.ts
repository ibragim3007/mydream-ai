import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAuthService } from '../api/api';
import { StorageKeys } from '../config/constants/storageKeys';

export class AuthServiceAsync implements IAuthService {
  async getToken() {
    const token = await AsyncStorage.getItem(StorageKeys.appToken);
    return token;
  }

  async setToken(token: string) {
    await AsyncStorage.setItem(StorageKeys.appToken, token);
  }

  async removeToken() {
    await AsyncStorage.removeItem(StorageKeys.appToken);
  }
}
