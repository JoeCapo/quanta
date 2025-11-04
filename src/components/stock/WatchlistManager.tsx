// src/components/stock/WatchlistManager.tsx

import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useStocks } from '../../hooks/useStocks';
import { addToWatchlist, removeFromWatchlist } from '../../services/firestoreService';
import { validateSymbol, getStockQuote } from '../../services/stockService';
import { DEFAULTS } from '../../utils/constants';
import Loading from '../Loading';
import ErrorMessage from '../ErrorMessage';
import StockCard from './StockCard';
import AddStockInput from './AddStockInput';

const WatchlistManager = () => {
  const { user, userProfile, updateUserProfile } = useAuth();
  const watchlist = userProfile?.watchlist || [];
  const { stocks, loading, error } = useStocks(watchlist);
  const [actionError, setActionError] = useState<string | null>(null);

  const handleAdd = async (symbol: string) => {
    if (!user) {
      throw new Error('You must be logged in to add stocks');
    }

    // Validate symbol format
    if (!validateSymbol(symbol)) {
      throw new Error('Please enter a valid stock symbol (1-5 letters)');
    }

    // Check for duplicates
    if (watchlist.includes(symbol)) {
      throw new Error('This stock is already in your watchlist');
    }

    // Check watchlist limit
    if (watchlist.length >= DEFAULTS.MAX_WATCHLIST_SIZE_FREE) {
      throw new Error('Watchlist full (10/10). Remove a stock to add another or upgrade to Pro.');
    }

    // Verify stock exists by fetching quote
    await getStockQuote(symbol);

    // Add to Firestore
    await addToWatchlist(user.uid, symbol);

    // Update local state
    await updateUserProfile({ watchlist: [...watchlist, symbol] });
  };

  const handleRemove = async (symbol: string) => {
    if (!user) return;

    try {
      setActionError(null);
      await removeFromWatchlist(user.uid, symbol);
      await updateUserProfile({ watchlist: watchlist.filter(s => s !== symbol) });
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to remove stock');
    }
  };

  if (watchlist.length === 0) {
    return (
      <div className="space-y-6">
        <AddStockInput
          onAdd={handleAdd}
          currentCount={0}
          maxCount={DEFAULTS.MAX_WATCHLIST_SIZE_FREE}
        />
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Watchlist Empty</h3>
          <p className="text-dark-text-secondary">Add stocks to track their real-time prices</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AddStockInput
        onAdd={handleAdd}
        currentCount={watchlist.length}
        maxCount={DEFAULTS.MAX_WATCHLIST_SIZE_FREE}
      />

      {actionError && <ErrorMessage message={actionError} />}
      {loading && <Loading text="Loading stocks..." />}
      {error && <ErrorMessage message={error} />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stocks.map(stock => (
          <StockCard key={stock.symbol} stock={stock} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
};

export default WatchlistManager;
