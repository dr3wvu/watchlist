import { getWatchlistSymbols } from "@/lib/actions/watchlist.action";
import { getCurrentUser } from "@/lib/betterauth/getCurrentUser";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import WatchlistTable from "./watchlistTable";
import { TradingViewWidget } from "@/components/TradingView";
import { TICKER_TAPE_WIDGET_CONFIG } from "@/lib/constants";

export default async function WatchlistPage() {
  // 1. Get logged‑in user
  const user = await getCurrentUser();
  const email = user?.email || "";

  // 2. Fetch watchlist symbols from DB
  const symbols = await getWatchlistSymbols(email);

  // 3. If empty, show empty state
  if (!symbols || symbols.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-semibold mb-4">Watchlist</h1>
        <p className="text-gray-500 max-w-md">
          No stocks being tracked. Search for a stock and add it to the
          watchlist.
        </p>
      </div>
    );
  }

  // 4. Mock stock data (replace with real API later)
  const stocksMapped = symbols.map((symbol) => ({
    symbol,
    company: `${symbol} Corp`,
    price: 123.45,
    change: "+1.23%",
    marketCap: "1.2B",
    peRatio: "18.4",
  }));

  // 5. Mock alerts
  const mockAlerts = [
    { stock: "AAPL", condition: "Price > $200" },
    { stock: "TSLA", condition: "Price < $150" },
    { stock: "NVDA", condition: "Change > 5%" },
  ];

  // 6. Mock news
  const mockNews = [
    {
      title: "Market Update: Tech Stocks Rally",
      summary:
        "Technology stocks saw strong gains today as investors reacted to positive earnings...",
    },
    {
      title: "Analysts Predict Growth in Semiconductor Sector",
      summary:
        "Semiconductor companies are expected to outperform this quarter due to increased demand...",
    },
  ];

  return (
    <div className="p-8 flex flex-col gap-10">
      <h1 className="watchlist-title ">Watchlist</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
        <div className="lg:col-span-3 h-full flex flex-col">
          <WatchlistTable initialSymbols={symbols} />
        </div>

        <div className="lg:col-span-1">
          <Card className="bg-gray-800 border border-gray-600">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-100">Alerts</CardTitle>
              <button className="add-alert">Create Alert</button>
            </CardHeader>

            <CardContent className="alert-list">
              {mockAlerts.length === 0 ? (
                <div className="alert-empty">No alerts created yet.</div>
              ) : (
                mockAlerts.map((alert, i) => (
                  <div key={i} className="alert-item">
                    <div className="alert-details">
                      <span className="alert-company">{alert.stock}</span>
                      <span className="alert-price">{alert.condition}</span>
                    </div>

                    <div className="alert-actions">
                      <button className="alert-update-btn">✎</button>
                      <button className="alert-delete-btn">🗑</button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">News</h2>

        <div className="watchlist-news">
          {mockNews.map((news, i) => (
            <div key={i} className="news-item">
              <span className="news-tag">NEWS</span>
              <h3 className="news-title">{news.title}</h3>
              <p className="news-summary">{news.summary}</p>
              <span className="news-cta">Read more →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
