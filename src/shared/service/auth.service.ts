import AsyncStorage from '@react-native-async-storage/async-storage';
import { IAuthService } from '../api/api';
import { StorageKeys } from '../config/constants/storageKeys';

export class AuthServiceAsync implements IAuthService {
  async getToken() {
    return '7a0f9f48-03b0-4c8d-9c54-411fb5df6f04';
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
