'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

export const getWatchlistSymbolsByEmail = async (
  email: string
): Promise<string[]> => {
  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if (!db) {
      throw new Error('Database connection is not established');
    }

    const user = await db
      .collection('user')
      .findOne<{ id?: string; _id?: unknown; email?: string }>({ email });

    if (!user) {
      return [];
    }

    const userId = user.id || user._id?.toString();

    if (!userId) {
      return [];
    }

    const watchlistItems = await Watchlist.find(
      { userId },
      { symbol: 1 }
    ).lean();

    if (!watchlistItems || watchlistItems.length === 0) {
      return [];
    }

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();

    return items.map(i => String(i.symbol));
  } catch (error) {
    console.error('Error fetching watchlist symbols by email:', error);
    return [];
  }
};
