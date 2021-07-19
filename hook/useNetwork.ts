import { JKArray } from 'data/interface/common';
import { useEffect, useState } from 'react';

const useNetwork = (): JKArray => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOffline);
    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOffline);
    };
  }, []);

  const checkOnline = (): void => {
    setOnline(true);
  };

  const checkOffline = (): void => {
    setOnline(false);
  };

  return [online];
}

export default useNetwork;
