"use client";

import { useWatchlistStore } from "@/store/watchlistStore";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useEffect } from "react";

type WatchlistTableProps = {
  initialSymbols: string[];
};

export default function WatchlistTable({
  initialSymbols,
}: WatchlistTableProps) {
  const { watchlist, setStatus, bulkSet } = useWatchlistStore();

  // Initialize Zustand once from server symbols
  useEffect(() => {
    if (Object.keys(watchlist).length === 0 && initialSymbols.length > 0) {
      const initialState: Record<string, boolean> = {};
      initialSymbols.forEach((s) => (initialState[s] = true));
      bulkSet(initialState);
    }
  }, [initialSymbols, watchlist, bulkSet]);

  const symbols = Object.keys(watchlist).filter((s) => watchlist[s]);

  const stocksMapped = symbols.map((symbol) => ({
    symbol,
    company: `${symbol} Corp`,
    price: 123.45,
    change: "+1.23%",
    marketCap: "1.2B",
    peRatio: "18.4",
  }));

  if (stocksMapped.length === 0) {
    return (
      <div className="text-gray-500 p-6">
        No stocks being tracked. Search for a stock and add it to the watchlist.
      </div>
    );
  }

  const remove = (symbol: string) => setStatus(symbol, false);

  return (
    <Table className="watchlist-table">
      <TableHeader className="table-header-row sticky top-0 bg-gray-900 z-10">
        <TableRow className="table-row">
          <TableHead className="table-header">Company</TableHead>
          <TableHead className="table-header">Symbol</TableHead>
          <TableHead className="table-header">Price</TableHead>
          <TableHead className="table-header">Change</TableHead>
          <TableHead className="table-header hidden md:table-cell">
            Market Cap
          </TableHead>
          <TableHead className="table-header hidden md:table-cell">
            P/E Ratio
          </TableHead>
          <TableHead className="text-right">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocksMapped.map((stock) => (
          <TableRow key={stock.symbol}>
            <TableCell className="table-cell">{stock.company}</TableCell>
            <TableCell className="table-cell">{stock.symbol}</TableCell>
            <TableCell className="table-cell">${stock.price}</TableCell>
            <TableCell className="table-cell">{stock.change}</TableCell>
            <TableCell className="table-cell hidden md:table-cell">
              {stock.marketCap}
            </TableCell>
            <TableCell className="table-cell hidden md:table-cell">
              {stock.peRatio}
            </TableCell>

            <TableCell className="text-right">
              <button
                onClick={() => remove(stock.symbol)}
                className="text-red-400 hover:text-red-500 transition"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
