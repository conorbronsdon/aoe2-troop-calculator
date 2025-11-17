import { useState, useEffect } from 'react';
import { StorageService } from '../services/storage.service';

export interface SavedCompositionsResult {
  count: number;
  refresh: () => void;
}

export function useSavedCompositions(): SavedCompositionsResult {
  const [count, setCount] = useState<number>(0);

  const updateCount = (): void => {
    if (StorageService.isAvailable()) {
      const saved = StorageService.getAll();
      setCount(saved.length);
    }
  };

  useEffect(() => {
    updateCount();

    // Listen for storage changes (for cross-tab sync and internal updates)
    const handleStorageChange = (e: StorageEvent): void => {
      if (e.key === 'aoe2-saved-compositions' || e.key === null) {
        updateCount();
      }
    };

    // Custom event for internal updates
    const handleCustomUpdate = (): void => {
      updateCount();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('savedCompositionsUpdated', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('savedCompositionsUpdated', handleCustomUpdate);
    };
  }, []);

  return { count, refresh: updateCount };
}
