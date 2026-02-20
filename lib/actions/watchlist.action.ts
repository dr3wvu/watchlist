"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";
import { getCurrentUser } from "../betterauth/getCurrentUser";

/**
 * Returns all watchlist symbols for a user
 */
export async function getWatchlistSymbols(email: string): Promise<string[]> {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    const user = await db
      ?.collection("user")
      .findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) {
      return [];
    }

    const userId = user.id || user._id || "";
    if (!userId) {
      return [];
    }

    const watchlist = await Watchlist.find(
      {
        userId,
      },
      { symbol: 1 },
    ).lean();

    return watchlist.map((item) => item.symbol);
  } catch (error) {
    console.error("Error fetching watchlist symbols:", error);
    return [];
  }
}

/**
 * Add a stock to the user's watchlist
 */
export async function addStockToWatchlist({
  symbol,
  company,
}: {
  symbol: string;
  company: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    const user = await getCurrentUser();

    if (!user?.id) {
      return { success: false, error: "User not found" };
    }

    await Watchlist.updateOne(
      { userId: user.id, symbol },
      { $set: { company, addedAt: new Date() } },
      { upsert: true },
    );
    return { success: true };
  } catch (error) {
    return { success: false, error: error?.toString() };
  }
}

/**
 * Remove a stock from the user's watchlist
 */
export async function removeStockFromWatchlist({
  symbol,
}: {
  symbol: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    const user = await getCurrentUser();

    if (!user?.id) {
      return { success: false, error: "User not found" };
    }

    await Watchlist.deleteOne({ userId: user.id, symbol });
    return { success: true };
  } catch (error) {
    return { success: false, error: error?.toString() };
  }
}

/**
 * Check if a symbol exists in user's watchlist
 */
export async function getSymbolFromWatchlist({
  symbol,
}: {
  symbol: string;
}): Promise<boolean> {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    const user = await getCurrentUser();

    if (!user?.id) return false;

    const exists = await Watchlist.exists({
      userId: user.id,
      symbol,
    }).lean();

    return !!exists;
  } catch (error) {
    console.error("getSymbolFromWatchlist error:", error);
    return false;
  }
}
