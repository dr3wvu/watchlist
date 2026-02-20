import { TradingViewWidget } from "@/components/TradingView";
import WatchlistWrapper from "@/components/WatchlistWrapper";
import {
  CANDLE_CHART_WIDGET_CONFIG,
  COMPANY_FINANCIAL_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  SYMBOL_DETAILS_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
} from "@/lib/constants";

export default async function stockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const SCRIPT_URL = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  return (
    <div className="flex min-h-screen p-6 md:p-6 lg:p-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Left column */}
        <div className="flex flex-col gap-8">
          <TradingViewWidget
            scriptUrl={`${SCRIPT_URL}symbol-info.js`}
            config={SYMBOL_DETAILS_WIDGET_CONFIG(symbol)}
            height={180}
          />

          <TradingViewWidget
            scriptUrl={`${SCRIPT_URL}symbol-profile.js`}
            config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            height={400}
          />

          <TradingViewWidget
            scriptUrl={`${SCRIPT_URL}financials.js`}
            config={COMPANY_FINANCIAL_WIDGET_CONFIG(symbol)}
            height={450}
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center w-full">
            <WatchlistWrapper symbol={symbol.toUpperCase()} />
          </div>

          <TradingViewWidget
            title="Candlestick Chart"
            scriptUrl={`${SCRIPT_URL}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            height={620}
          />

          <TradingViewWidget
            scriptUrl={`${SCRIPT_URL}technical-analysis.js`}
            config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(symbol)}
            height={400}
          />
        </div>
      </section>
    </div>
  );
}
