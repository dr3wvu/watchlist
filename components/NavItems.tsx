"use client";
import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SearchCommand from "./SearchCommand";

const NavItems = ({
  initialStocks,
  stacked = false,
}: {
  initialStocks: StockWithWatchlistStatus[];
  stacked?: boolean;
}) => {
  const pathName = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathName === "/";
    }

    return pathName.startsWith(path);
  };

  return (
    <ul
      className={`flex sm:flex-row p-3 gap-10 font-medium ${
        stacked ? "flex-col" : "flex-row"
      }`}
    >
      {NAV_ITEMS.map(({ href, title }) => {
        if (href === "/search")
          return (
            <li key="search-trigger">
              <SearchCommand
                renderAs="text"
                label="Search"
                initialStocks={initialStocks}
              />
            </li>
          );

        return (
          <li key={href}>
            <Link
              href={href}
              className={`hover:text-yellow-500 transition-colors ${
                isActive(href) ? "text-gray-100" : ""
              }`}
            >
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;
