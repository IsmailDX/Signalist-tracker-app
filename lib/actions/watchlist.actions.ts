'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { fetchJSON } from '@/lib/actions/finnhub.actions';

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const FINNHUB_TOKEN =
  process.env.FINNHUB_API_KEY ?? process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? '';

const getCurrentUserId = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session.user.id;
};

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

export const addToWatchlist = async (
  symbol: string,
  company: string
): Promise<{ success: boolean } | never> => {
  try {
    const userId = await getCurrentUserId();

    await connectToDatabase();

    await Watchlist.findOneAndUpdate(
      { userId, symbol },
      { userId, symbol, company },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return { success: true };
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    throw error;
  }
};

export const removeFromWatchlist = async (
  symbol: string
): Promise<{ success: boolean } | never> => {
  try {
    const userId = await getCurrentUserId();

    await connectToDatabase();

    await Watchlist.deleteOne({ userId, symbol });

    return { success: true };
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    throw error;
  }
};

export const getCurrentUserWatchlist = async (): Promise<Stock[]> => {
  try {
    const userId = await getCurrentUserId();

    await connectToDatabase();

    const items = await Watchlist.find({ userId }).lean();

    if (!items || items.length === 0) return [];

    if (!FINNHUB_TOKEN) {
      // Fallback: no market data, return basic stock info
      return items.map(item => ({
        symbol: item.symbol,
        name: item.company,
        exchange: 'US',
        type: 'Stock',
      }));
    }

    const stocks: Stock[] = await Promise.all(
      items.map(async item => {
        try {
          const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(
            item.symbol
          )}&token=${FINNHUB_TOKEN}`;

          const profile = await fetchJSON<any>(url, 3600);

          const name: string =
            profile?.name || profile?.ticker || item.company || item.symbol;
          const exchange: string = profile?.exchange || 'US';

          return {
            symbol: item.symbol,
            name,
            exchange,
            type: 'Stock',
          } satisfies Stock;
        } catch (error) {
          console.error(
            'Error fetching profile for watchlist symbol:',
            item.symbol,
            error
          );
          return {
            symbol: item.symbol,
            name: item.company || item.symbol,
            exchange: 'US',
            type: 'Stock',
          } satisfies Stock;
        }
      })
    );

    return stocks;
  } catch (error) {
    console.error('Error fetching current user watchlist:', error);
    return [];
  }
};
