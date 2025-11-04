// src/services/firestoreService.ts

import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Add a stock symbol to user's watchlist
 */
export const addToWatchlist = async (uid: string, symbol: string): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    watchlist: arrayUnion(symbol.toUpperCase()),
    updatedAt: new Date(),
  });
};

/**
 * Remove a stock symbol from user's watchlist
 */
export const removeFromWatchlist = async (uid: string, symbol: string): Promise<void> => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    watchlist: arrayRemove(symbol.toUpperCase()),
    updatedAt: new Date(),
  });
};
