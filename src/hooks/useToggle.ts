import { useState, useCallback } from 'react';

/**
 * Custom hook per gestire valori booleani toggle
 * @param initialValue - Valore iniziale (default: false)
 * @returns [value, toggle, setValue] - Valore corrente, funzione toggle, funzione setValue
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setToggleValue = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [value, toggle, setToggleValue];
}

