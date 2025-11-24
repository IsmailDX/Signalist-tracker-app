'use client';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  addToWatchlist,
  removeFromWatchlist,
} from '@/lib/actions/watchlist.actions';

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon = false,
  onWatchlistChange,
}: WatchlistButtonProps) => {
  const [added, setAdded] = useState<boolean>(!!isInWatchlist);
  const [submitting, setSubmitting] = useState(false);

  const label = useMemo(
    () => (added ? 'Remove from Watchlist' : 'Add to Watchlist'),
    [added]
  );

  const handleClick = async () => {
    if (submitting) return;

    const next = !added;
    setAdded(next);
    setSubmitting(true);

    try {
      if (next) {
        await addToWatchlist(symbol, company);
        toast.success(`${symbol.toUpperCase()} added to your watchlist`, {
          description: 'You can see it on your Watchlist page.',
        });
      } else {
        await removeFromWatchlist(symbol);
        toast.success(`${symbol.toUpperCase()} removed from your watchlist`);
      }

      onWatchlistChange?.(symbol, next);
    } catch (error: unknown) {
      setAdded(!next);

      const message =
        error instanceof Error && error.message === 'Unauthorized'
          ? 'Please sign in to manage your watchlist.'
          : 'Something went wrong. Please try again.';

      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <button
      className={`watchlist-btn ${added ? 'watchlist-remove' : ''}`}
      onClick={handleClick}
      disabled={submitting}
    >
      {showTrashIcon && added ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-7 4v6m4-6v6m4-6v6"
          />
        </svg>
      ) : null}
      <span>{label}</span>
    </button>
  );
};

export default WatchlistButton;
