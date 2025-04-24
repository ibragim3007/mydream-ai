import { useRouter } from 'expo-router';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'UserInactivity',
});

const LOCK_TIME = 10;

export const UserInactivityProvider = ({ children }: PropsWithChildren) => {
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useEffect(() => {
    const subsciption = AppState.addEventListener('change', handleAppStateChanged);

    return () => {
      subsciption.remove();
    };
  }, []);

  const handleAppStateChanged = (nextAppState: AppStateStatus) => {
    console.log('appState: ', appState.current, nextAppState);

    if (nextAppState === 'inactive') {
      router.push('/utilsScreens/blockScreen');
    } else {
      if (router.canGoBack()) {
        router.back();
      }
    }

    // Проверячем находится ли приложение в фоне
    // Если да, то записываем время
    // Если приложение переходит в активное состояние и время больше 3 секунд
    // то переходим на экран блокировки
    if (nextAppState === 'background') {
      recordStartTime();
    } else if (nextAppState === 'active' && appState.current.match(/background/)) {
      const elapsed = Date.now() - (storage.getNumber('startTime') || 0);
      console.log(elapsed);
      if (elapsed >= LOCK_TIME) {
        router.push('/utilsScreens/lockScreen');
      }
    }

    appState.current = nextAppState;
  };

  const recordStartTime = () => {
    storage.set('startTime', Date.now());
  };

  return children;
};
