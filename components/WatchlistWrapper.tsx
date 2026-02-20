"use client";

import { useWatchlistStore } from "@/store/watchlistStore";
import WatchlistButton from "./WatchlistButton";

export default function WatchlistWrapper({ symbol }: { symbol: string }) {
  const { watchlist } = useWatchlistStore();
  const isInWatchlist = watchlist[symbol] ?? false;

  return (
    <WatchlistButton
      symbol={symbol}
      company={symbol}
      isInWatchlist={isInWatchlist}
    />
  );
}
