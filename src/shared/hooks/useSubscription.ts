import Superwall, { SubscriptionStatus } from '@superwall/react-native-superwall';
import { useEffect, useState } from 'react';

export function useSubscription() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus['status']>('UNKNOWN');

  const initSubStatus = async () => {
    return await Superwall.shared.getSubscriptionStatus();
  };

  useEffect(() => {
    (async () => {
      const res = await initSubStatus();
      setSubscriptionStatus(res.status);
    })();
  }, []);

  const isActive = subscriptionStatus === 'ACTIVE';

  return { subscriptionStatus, isActive };
}
