import * as SecureStore from 'expo-secure-store';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { StorageKeys } from '../config/constants/storageKeys';

export const getAppToken = async () => {
  let id = await SecureStore.getItemAsync(StorageKeys.appToken);

  if (!id) {
    id = uuidv4();
    await SecureStore.setItemAsync(StorageKeys.appToken, id);
  }
  return id;
};

export const isAppToken = async () => {
  const id = await SecureStore.getItemAsync(StorageKeys.appToken);
  return !!id;
};
