"use server";

import { connectToDatabase } from "@/database/mongoose";
import { Watchlist } from "@/database/models/watchlist.model";

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

    const userId = user.id || "";
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
