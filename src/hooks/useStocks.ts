// src/hooks/useStocks.ts

import { useState, useEffect, useCallback } from 'react';
import type { Stock } from '../types';
import { getMultipleQuotes } from '../services/stockService';

/**
 * Custom hook to fetch and auto-refresh stock quotes
 * @param symbols - Array of stock symbols to fetch
 * @returns Object containing stocks, loading state, error, and refresh function
 */
export const useStocks = (symbols: string[]) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStocks = useCallback(async () => {
    if (symbols.length === 0) {
      setStocks([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getMultipleQuotes(symbols);
      setStocks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stocks');
    } finally {
      setLoading(false);
    }
  }, [symbols]);

  // Initial fetch
  useEffect(() => {
    fetchStocks();
  }, [fetchStocks]);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (symbols.length === 0) return;

    const interval = setInterval(fetchStocks, 60000);
    return () => clearInterval(interval);
  }, [fetchStocks, symbols.length]);

  return { stocks, loading, error, refreshStocks: fetchStocks };
};
