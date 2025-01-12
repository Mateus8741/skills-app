import { useEffect } from 'react';

import { useUserStorage } from '~/contexts';

export function AuthListener() {
  const { removeUser } = useUserStorage();

  useEffect(() => {}, [removeUser]);

  return null;
}
