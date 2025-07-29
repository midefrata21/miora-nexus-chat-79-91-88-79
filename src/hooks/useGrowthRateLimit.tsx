import { useRef } from 'react';

export const useGrowthRateLimit = () => {
  const lastRecordTime = useRef<number>(0);
  const recordedEntries = useRef<Set<string>>(new Set());

  const canRecord = (entryKey: string, minInterval: number = 2000): boolean => {
    const now = Date.now();
    
    // Rate limiting: minimum interval between records
    if (now - lastRecordTime.current < minInterval) {
      return false;
    }

    // Duplicate prevention
    if (recordedEntries.current.has(entryKey)) {
      return false;
    }

    return true;
  };

  const recordEntry = (entryKey: string) => {
    recordedEntries.current.add(entryKey);
    lastRecordTime.current = Date.now();

    // Clean up old entries from memory (keep only last 50)
    if (recordedEntries.current.size > 50) {
      const entriesArray = Array.from(recordedEntries.current);
      recordedEntries.current = new Set(entriesArray.slice(-25));
    }
  };

  const addSessionEntry = (sessionKey: string): boolean => {
    if (recordedEntries.current.has(sessionKey)) {
      return false;
    }
    recordedEntries.current.add(sessionKey);
    return true;
  };

  return {
    canRecord,
    recordEntry,
    addSessionEntry,
    lastRecordTime: lastRecordTime.current
  };
};
