import { useState, useEffect } from 'react';
import { StorageService } from '../services/storage.service';

export function useSavedCompositions() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    if (StorageService.isAvailable()) {
      const saved = StorageService.getAll();
      setCount(saved.length);
    }
  };

  useEffect(() => {
    updateCount();

    // Listen for storage changes (for cross-tab sync and internal updates)
    const handleStorageChange = (e) => {
      if (e.key === 'aoe2-saved-compositions' || e.key === null) {
        updateCount();
      }
    };

    // Custom event for internal updates
    const handleCustomUpdate = () => {
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
