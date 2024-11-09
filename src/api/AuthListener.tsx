import { useEffect } from 'react';
import { useUserStorage } from '~/contexts';
import { eventEmitter, EventTypes } from '~/utils/eventEmitter';

export function AuthListener() {
  const { removeUser } = useUserStorage();

  useEffect(() => {
    const subscription = eventEmitter.addListener(
      EventTypes.UNAUTHORIZED, 
      () => {
        removeUser();
      }
    );
    return () => {
      subscription.removeListener(EventTypes.UNAUTHORIZED);
    };
  }, [removeUser]);

  return null;
}