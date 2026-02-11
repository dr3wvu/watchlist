"use client";
import useTradingViewWidget from "@/hooks/useTradingViewWidget";
import React, { useEffect, useRef, memo } from "react";
import { cn } from "@/lib/utils";

interface TradingViewWdigetProps {
  title?: string;
  scriptUrl: string;
  config?: any;
  height?: number;
  className?: string;
}

export const TradingViewWidget = ({
  title,
  scriptUrl,
  config,
  height = 600,
  className,
}: TradingViewWdigetProps) => {
  const container = useTradingViewWidget(scriptUrl, config, height);

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-semibold text-2xl text-gray-100 mb-5">{title}</h3>
      )}

      <div
        className={cn("tradingview-widget-container", className)}
        ref={container}
      >
        <div
          className="tradingview-widget-container__widget"
          style={{ height: height, width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
