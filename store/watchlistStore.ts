"use client";

import { create } from "zustand";

type WatchlistStore = {
  watchlist: Record<string, boolean>;
  setStatus: (symbol: string, status: boolean) => void;
  bulkSet: (data: Record<string, boolean>) => void;
};

export const useWatchlistStore = create<WatchlistStore>((set) => ({
  watchlist: {},

  setStatus: (symbol, status) =>
    set((state) => ({
      watchlist: {
        ...state.watchlist,
        [symbol]: status,
      },
    })),

  bulkSet: (data) =>
    set(() => ({
      watchlist: data,
    })),
}));
