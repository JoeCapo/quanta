// src/services/stockService.ts

import axios from 'axios';
import type { Stock } from '../types';

const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';
const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

/**
 * Validate stock symbol format (1-5 uppercase letters)
 */
export const validateSymbol = (symbol: string): boolean => {
  const regex = /^[A-Z]{1,5}$/;
  return regex.test(symbol.toUpperCase());
};

/**
 * Get single stock quote from Finnhub API
 */
export const getStockQuote = async (symbol: string): Promise<Stock> => {
  const upperSymbol = symbol.toUpperCase();

  try {
    // Fetch quote data
    const quoteRes = await axios.get(`${FINNHUB_BASE_URL}/quote`, {
      params: { symbol: upperSymbol, token: API_KEY }
    });

    // Check if valid (Finnhub returns c: 0 for invalid symbols)
    if (!quoteRes.data.c || quoteRes.data.c === 0) {
      throw new Error('Stock symbol not found. Please check and try again.');
    }

    // Fetch company profile for name
    const profileRes = await axios.get(`${FINNHUB_BASE_URL}/stock/profile2`, {
      params: { symbol: upperSymbol, token: API_KEY }
    });

    return {
      symbol: upperSymbol,
      name: profileRes.data.name || upperSymbol,
      price: quoteRes.data.c,
      change: quoteRes.data.d,
      changePercent: quoteRes.data.dp,
      lastUpdated: new Date(),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 429) {
        throw new Error('Too many requests. Please wait a moment.');
      }
      if (error.response?.status === 401) {
        throw new Error('API key invalid. Please check configuration.');
      }
    }

    // Re-throw if it's already our custom error
    if (error instanceof Error && error.message.includes('Stock symbol not found')) {
      throw error;
    }

    throw new Error('Failed to fetch stock data. Please try again.');
  }
};

/**
 * Batch fetch multiple stock quotes
 */
export const getMultipleQuotes = async (symbols: string[]): Promise<Stock[]> => {
  if (symbols.length === 0) {
    return [];
  }

  const promises = symbols.map(s => getStockQuote(s));
  const results = await Promise.allSettled(promises);

  // Return only successful results
  return results
    .filter((r): r is PromiseFulfilledResult<Stock> => r.status === 'fulfilled')
    .map(r => r.value);
};
