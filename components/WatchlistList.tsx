'use client';

import { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { removeFromWatchlist } from '@/lib/actions/watchlist.actions';

type WatchlistListProps = {
  initialStocks: Stock[];
};

const WatchlistList = ({ initialStocks }: WatchlistListProps) => {
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [removingSymbol, setRemovingSymbol] = useState<string | null>(null);

  const handleRemove = async (symbol: string) => {
    if (removingSymbol === symbol) return;

    setRemovingSymbol(symbol);

    try {
      await removeFromWatchlist(symbol);
      setStocks(prev => prev.filter(s => s.symbol !== symbol));
      toast.success(`${symbol.toUpperCase()} removed from your watchlist`);
    } catch (error) {
      console.error('Failed to remove from watchlist', error);
      toast.error('Failed to remove from watchlist. Please try again.');
    } finally {
      setRemovingSymbol(null);
    }
  };

  if (!stocks || stocks.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
      <ul>
        {stocks.map((stock, i) => (
          <li key={`${stock.symbol}-${i}`} className="search-item">
            <div className="flex items-center gap-2">
              <Link
                href={`/stocks/${stock.symbol}`}
                className="search-item-link flex-1"
              >
                <TrendingUp className="h-4 w-4 text-gray-500" />
                <div className="flex-1">
                  <div className="search-item-name">{stock.name}</div>
                  <div className="text-sm text-gray-500">
                    {stock.symbol} | {stock.exchange} | {stock.type}
                  </div>
                </div>
              </Link>

              <button
                type="button"
                aria-label={`Remove ${stock.symbol} from watchlist`}
                className="ml-2 p-2 rounded-full hover:bg-red-600/10 disabled:opacity-50 cursor-pointer"
                onClick={() => handleRemove(stock.symbol)}
                disabled={removingSymbol === stock.symbol}
              >
                <Trash2 className="trash-icon" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchlistList;
