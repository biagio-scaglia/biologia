import { useState, useEffect } from 'react';

/**
 * Custom hook per gestire localStorage in modo sincronizzato con React
 * @param key - Chiave per localStorage
 * @param initialValue - Valore iniziale se la chiave non esiste
 * @returns [storedValue, setValue] - Valore salvato e funzione per aggiornarlo
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Stato per memorizzare il valore
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return initialValue;
      }
      
      let item: string | null = null;
      try {
        item = window.localStorage.getItem(key);
      } catch (e) {
        // Se non riesce a leggere, ritorna il valore iniziale
        console.warn(`Impossibile leggere localStorage key "${key}":`, e);
        return initialValue;
      }
      
      if (!item || item === 'null' || item === 'undefined') {
        return initialValue;
      }
      
      // Verifica che il valore possa essere parsato
      let parsed: any;
      try {
        parsed = JSON.parse(item);
      } catch (parseError) {
        // Se il parsing fallisce, rimuovi il valore corrotto
        console.warn(`Valore corrotto in localStorage key "${key}", rimozione...`, parseError);
        try {
          window.localStorage.removeItem(key);
        } catch (e) {
          // Ignora errori nella rimozione
        }
        return initialValue;
      }
      
      // Se il valore parsato è null o undefined, usa il valore iniziale
      if (parsed === null || parsed === undefined) {
        return initialValue;
      }
      
      return parsed;
    } catch (error) {
      console.error(`Errore nel leggere localStorage key "${key}":`, error);
      // Rimuovi il valore corrotto
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } catch (e) {
        // Ignora errori nella rimozione
      }
      return initialValue;
    }
  });

  // Funzione per aggiornare il valore
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      if (typeof window === 'undefined') {
        return;
      }
      // Permette l'uso di una funzione come setState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Verifica che il valore possa essere serializzato
      if (valueToStore === undefined) {
        console.warn(`Tentativo di salvare valore undefined in localStorage key "${key}"`);
        return;
      }
      
      setStoredValue(valueToStore);
      const serialized = JSON.stringify(valueToStore);
      window.localStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Errore nel salvare localStorage key "${key}":`, error);
      // Se c'è un errore, prova a rimuovere il valore corrotto
      try {
        window.localStorage.removeItem(key);
      } catch (e) {
        // Ignora errori nella rimozione
      }
    }
  };

  // Sincronizza con altri tab/window
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Errore nel sincronizzare localStorage key "${key}":`, error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key]);

  return [storedValue, setValue];
}

