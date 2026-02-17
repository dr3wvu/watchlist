export const NAV_ITEMS = [
  { href: "/", title: "Dashboard" },
  { href: "/search", title: "Search" },
  { href: "/watchlist", title: "Watchlist" },
];

export const MARKET_OVERVIEW_WIDGET_CONFIG = {
  colorTheme: "dark",
  dateRange: "12M",
  isTransparent: true,
  showFloatingTooltip: true,
  gridLineColor: "rgba(240, 243, 250, 0)",
  scaleFontColor: "#DBDBDB",
  belowLineFillColorGrowing: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorFalling: "rgba(41, 98, 255, 0.12)",
  belowLineFillColorGrowingBottom: "rgba(41, 98, 255, 0)",
  belowLineFillColorFallingBottom: "rgba(41, 98, 255, 0)",
  tabs: [
    {
      title: "Technology",
      symbols: [
        { s: "NASDAQ:AMZN", d: "Amazon" },
        { s: "NASDAQ:AAPL", d: "Apple" },
        { s: "NASDAQ:GOOGL", d: "Alphabet" },
        { s: "NASDAQ:MSFT", d: "Microsoft" },
        { s: "NASDAQ:FB", d: "Meta Platforms" },
      ],
    },
    {
      title: "Financial",
      symbols: [
        {
          s: "TSX:TD",
          d: "TD",
          logoid: "toronto-dominion-bank",
          "currency-logoid": "country/CA",
        },
        {
          s: "TSX:RY",
          d: "",
          logoid: "royal-bank-of-canada",
          "currency-logoid": "country/CA",
        },
        {
          s: "TSX:BNS",
          d: "",
          logoid: "bank-of-nova-scotia",
          "currency-logoid": "country/CA",
        },
        {
          s: "TSX:CM",
          d: "",
          logoid: "canadian-imperial-bank-of-commerce",
          "currency-logoid": "country/CA",
        },
      ],
    },

    {
      title: "Services",
      symbols: [
        { s: "NYSE:BABA", d: "Alibaba Group Hldg Ltd" },
        { s: "NYSE:T", d: "At&t Inc" },
        { s: "NYSE:WMT", d: "Walmart" },
        { s: "NYSE:V", d: "Visa" },
      ],
    },
  ],
  support_host: "https://www.tradingview.com",
  backgroundColor: "#141414",
  width: "100%",
  height: 700,
  showChart: true,
};

export const HEATMAP_WIDGET_CONFIG = {
  dataSource: "SPX500",
  blockSize: "market_cap_basic",
  blockColor: "change",
  grouping: "sector",
  locale: "en",
  symbolUrl: "",
  colorTheme: "dark",
  exchanges: [],
  hasTopBar: false,
  isDataSetEnabled: false,
  isZoomEnabled: true,
  hasSymbolTooltip: true,
  isMonoSize: false,
  width: "100%",
  height: 600,
};

export const TOP_STORIES_WIDGET_CONFIG = {
  displayMode: "regular",
  feedMode: "all_symbols",
  colorTheme: "dark",
  isTransparent: false,
  locale: "en",
  width: 400,
  height: 550,
};

export const MARKET_DATA_WIDGET_CONFIG = {
  colorTheme: "dark",
  locale: "en",
  largeChartUrl: "",
  isTransparent: false,
  showSymbolLogo: true,
  backgroundColor: "#0F0F0F",
  support_host: "https://www.tradingview.com",
  width: 550,
  height: 550,
  symbolsGroups: [
    {
      name: "Indices",
      symbols: [
        {
          name: "FOREXCOM:SPXUSD",
          displayName: "S&P 500 Index",
        },
        {
          name: "FOREXCOM:NSXUSD",
          displayName: "US 100 Cash CFD",
        },
        {
          name: "FOREXCOM:DJI",
          displayName: "Dow Jones Industrial Average Index",
        },
        {
          name: "INDEX:NKY",
          displayName: "Japan 225",
        },
        {
          name: "INDEX:DEU40",
          displayName: "DAX Index",
        },
        {
          name: "FOREXCOM:UKXGBP",
          displayName: "FTSE 100 Index",
        },
      ],
    },
    {
      name: "Futures",
      symbols: [
        {
          name: "BMFBOVESPA:ISP1!",
          displayName: "S&P 500",
        },
        {
          name: "BMFBOVESPA:EUR1!",
          displayName: "Euro",
        },
        {
          name: "CMCMARKETS:GOLD",
          displayName: "Gold",
        },
        {
          name: "PYTH:WTI3!",
          displayName: "WTI Crude Oil",
        },
        {
          name: "BMFBOVESPA:CCM1!",
          displayName: "Corn",
        },
      ],
    },
    {
      name: "Bonds",
      symbols: [
        {
          name: "EUREX:FGBL1!",
          displayName: "Euro Bund",
        },
        {
          name: "EUREX:FBTP1!",
          displayName: "Euro BTP",
        },
        {
          name: "EUREX:FGBM1!",
          displayName: "Euro BOBL",
        },
      ],
    },
    {
      name: "Forex",
      symbols: [
        {
          name: "FX:EURUSD",
          displayName: "EUR to USD",
        },
        {
          name: "FX:GBPUSD",
          displayName: "GBP to USD",
        },
        {
          name: "FX:USDJPY",
          displayName: "USD to JPY",
        },
        {
          name: "FX:USDCHF",
          displayName: "USD to CHF",
        },
        {
          name: "FX:AUDUSD",
          displayName: "AUD to USD",
        },
        {
          name: "FX:USDCAD",
          displayName: "USD to CAD",
        },
      ],
    },
  ],
};

export const INVESTMENT_GOALS = [
  { label: "Aggresive", value: "Aggressive" },
  { label: "Growth", value: "Growth" },
  { label: "Balanced", value: "Balanced" },
  { label: "Conservative", value: "Conservative" },
];
export const RISK_TOLERANCE_OPTIONS = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

export const POPULAR_STOCK_SYMBOLS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "TSLA",
  "META",
  "NVDA",
  "NFLX",
  "ORCL",
  "CRM",

  "ADBE",
  "INTC",
  "AMD",
  "PYPL",
  "UBER",
  "ZOOM",
  "SPOT",
  "SQ",
  "SHOP",
  "ROKU",

  "SNOW",
  "PLTR",
  "COIN",
  "RBLX",
  "DDOG",
  "CRWD",
  "NET",
  "OKTA",
  "TWLO",
  "ZM",

  "DOCU",
  "PTON",
  "PINS",
  "SNAP",
  "LYFT",
  "DASH",
  "ABNB",
  "RIVN",
  "LCID",
  "NIO",

  "XPEV",
  "LI",
  "BABA",
  "JD",
  "PDD",
  "TME",
  "BILI",
  "DIDI",
  "GRAB",
  "SE",
];
