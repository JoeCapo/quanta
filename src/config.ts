// src/config.ts
// Application configuration

/**
 * Enable mock authentication mode for development without Firebase
 * Set to true to use mock auth, false to use real Firebase
 */
export const USE_MOCK_AUTH = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

/**
 * Check if Firebase is properly configured
 */
export const isFirebaseConfigured = (): boolean => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  return apiKey !== undefined && apiKey !== 'your_firebase_api_key_here' && apiKey.length > 0;
};

/**
 * Determine which auth mode to use
 * Automatically uses mock auth if Firebase is not configured
 */
export const shouldUseMockAuth = (): boolean => {
  // If explicitly set to use mock auth
  if (USE_MOCK_AUTH) return true;

  // If Firebase is not configured, fall back to mock auth
  if (!isFirebaseConfigured()) {
    console.warn('⚠️ Firebase not configured. Using mock authentication mode.');
    console.warn('💡 To use real Firebase, set up your .env file with Firebase credentials.');
    return true;
  }

  return false;
};
