"use client";
import { NAV_ITEMS } from "@/app/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = ({ stacked = false }) => {
  const pathName = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathName === "/";
    }

    return pathName.startsWith(path);
  };

  return (
    <ul
      className={`flex p-2 gap-3 font-medium ${
        stacked ? "flex-col" : "flex-row"
      }`}
    >
      {NAV_ITEMS.map(({ href, title }) => (
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
      ))}
    </ul>
  );
};

export default NavItems;
