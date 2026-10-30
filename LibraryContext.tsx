import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { storage } from '../data/piles';
import type { TabId } from '../types';

interface LibraryValue {
  tab: TabId;
  setTab: (tab: TabId) => void;
  freedMb: number;
  deletedCount: number;
  clearedPiles: string[];
  recordCleanup: (pileId: string, deleted: number, mb: number) => void;
  reclaimableGb: number;
}

const LibraryContext = createContext<LibraryValue | null>(null);

export function LibraryProvider({
  children,
  initialTab



}: {children: React.ReactNode;initialTab: TabId;}) {
  const [tab, setTab] = useState<TabId>(initialTab);
  const [freedMb, setFreedMb] = useState(0);
  const [deletedCount, setDeletedCount] = useState(0);
  const [clearedPiles, setClearedPiles] = useState<string[]>([]);

  const recordCleanup = useCallback((pileId: string, deleted: number, mb: number) => {
    setFreedMb((prev) => prev + mb);
    setDeletedCount((prev) => prev + deleted);
    setClearedPiles((prev) => prev.includes(pileId) ? prev : [...prev, pileId]);
  }, []);

  const value = useMemo<LibraryValue>(
    () => ({
      tab,
      setTab,
      freedMb,
      deletedCount,
      clearedPiles,
      recordCleanup,
      reclaimableGb: Math.max(0, storage.reclaimableGb - freedMb / 1024)
    }),
    [tab, freedMb, deletedCount, clearedPiles, recordCleanup]
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary(): LibraryValue {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used inside LibraryProvider');
  return ctx;
}