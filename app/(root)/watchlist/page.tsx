import { getCurrentUserWatchlist } from '@/lib/actions/watchlist.actions';
import WatchlistList from '@/components/WatchlistList';

const WatchlistPage = async () => {
  const stocks = await getCurrentUserWatchlist();

  if (!stocks || stocks.length === 0) {
    return (
      <div className="watchlist-empty-container">
        <div className="watchlist-empty">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FACC15"
            strokeWidth="1.5"
            className="watchlist-star"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
            />
          </svg>
          <h1 className="empty-title">No stocks in your watchlist yet</h1>
          <p className="empty-description">
            Browse any stock and click "Add to Watchlist" on its details page to
            start tracking it here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <section className="watchlist">
        <h1 className="watchlist-title">Your Watchlist</h1>

        <WatchlistList initialStocks={stocks} />
      </section>
    </div>
  );
};

export default WatchlistPage;
