import { useState, useEffect } from 'react';

export function useLocalStorage<Type>(
  key: string
): [Type | null, (value: Type) => void] {
  const [storedValue, setStoredValue] = useState<Type | null>(null);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item != null) {
      try {
        const parsedItem = JSON.parse(item);
        setStoredValue(parsedItem);
      } catch (error) {
        //eslint-disable-next-line no-console
        console.log(error);
      }
    }
  }, [key]);

  const updateLocalStorage = (value: Type) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, updateLocalStorage];
}

