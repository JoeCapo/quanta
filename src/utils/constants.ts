// src/utils/constants.ts

import type { StrategyOption } from '../types';

// ============================================================================
// INVESTMENT STRATEGIES
// ============================================================================

export const INVESTMENT_STRATEGIES: StrategyOption[] = [
  {
    id: 'dividend',
    name: 'Dividend Investing',
    description: 'Focus on stocks that pay regular dividends for steady passive income.',
    icon: '💰',
    characteristics: [
      'Stable companies with consistent payouts',
      'Regular income stream',
      'Lower volatility',
      'Compound growth through reinvestment',
    ],
  },
  {
    id: 'growth',
    name: 'Growth Investing',
    description: 'Invest in companies with high growth potential and innovation.',
    icon: '📈',
    characteristics: [
      'High-potential companies',
      'Technology and innovation focus',
      'Capital appreciation',
      'Higher risk, higher reward',
    ],
  },
  {
    id: 'value',
    name: 'Value Investing',
    description: 'Find undervalued stocks trading below their intrinsic value.',
    icon: '💎',
    characteristics: [
      'Underpriced quality companies',
      'Strong fundamentals',
      'Long-term perspective',
      'Margin of safety',
    ],
  },
  {
    id: 'index',
    name: 'Index Fund Strategy',
    description: 'Diversify with low-cost index funds tracking market indices.',
    icon: '📊',
    characteristics: [
      'Broad market exposure',
      'Low fees and maintenance',
      'Passive management',
      'Long-term wealth building',
    ],
  },
];

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const API_CONFIG = {
  FINNHUB_BASE_URL: 'https://finnhub.io/api/v1',
  HUGGINGFACE_BASE_URL: 'https://api-inference.huggingface.co/models',
  HUGGINGFACE_MODEL: 'meta-llama/Llama-2-7b-chat-hf', // Can be changed based on availability
};

// ============================================================================
// APP DEFAULTS
// ============================================================================

export const DEFAULTS = {
  MONTHLY_BUDGET: 1000,
  DEFAULT_WATCHLIST: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'],
  STOCK_UPDATE_INTERVAL: 60000, // 1 minute in milliseconds
  MAX_WATCHLIST_SIZE_FREE: 10,
  MAX_WATCHLIST_SIZE_PRO: 50,
  AI_MESSAGE_LIMIT_FREE: 10,
  AI_MESSAGE_LIMIT_PRO: -1, // Unlimited
};

// ============================================================================
// ROUTES
// ============================================================================

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  CHAT: '/chat',
  STOCK_DETAIL: '/stock/:symbol',
  ABOUT: '/about',
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid email or password. Please try again.',
    EMAIL_IN_USE: 'This email is already registered. Please login instead.',
    WEAK_PASSWORD: 'Password should be at least 6 characters long.',
    NETWORK_ERROR: 'Network error. Please check your internet connection.',
    USER_NOT_FOUND: 'No account found with this email.',
    GENERIC: 'Authentication failed. Please try again.',
  },
  STOCK: {
    FETCH_FAILED: 'Failed to fetch stock data. Please try again.',
    INVALID_SYMBOL: 'Invalid stock symbol. Please check and try again.',
    NOT_FOUND: 'Stock not found. Please verify the symbol.',
    RATE_LIMIT: 'Too many requests. Please wait a moment.',
  },
  AI: {
    REQUEST_FAILED: 'Failed to get AI response. Please try again.',
    RATE_LIMIT: 'Daily AI message limit reached. Upgrade to Pro for unlimited access.',
    NETWORK_ERROR: 'Network error connecting to AI service.',
    INVALID_INPUT: 'Please provide valid input for analysis.',
  },
  GENERAL: {
    UNKNOWN: 'An unexpected error occurred. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    TIMEOUT: 'Request timed out. Please try again.',
  },
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGIN: 'Welcome back! Successfully logged in.',
    SIGNUP: 'Account created successfully! Welcome to Quanta.',
    LOGOUT: 'Logged out successfully.',
    PASSWORD_RESET: 'Password reset email sent. Check your inbox.',
  },
  PROFILE: {
    UPDATED: 'Profile updated successfully!',
    STRATEGY_CHANGED: 'Investment strategy updated.',
    BUDGET_UPDATED: 'Monthly budget saved.',
  },
  STOCK: {
    ADDED_TO_WATCHLIST: 'Stock added to watchlist.',
    REMOVED_FROM_WATCHLIST: 'Stock removed from watchlist.',
  },
} as const;

// ============================================================================
// VALIDATION RULES
// ============================================================================

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 6,
  MIN_BUDGET: 10,
  MAX_BUDGET: 1000000,
  MAX_DISPLAY_NAME_LENGTH: 50,
} as const;

// ============================================================================
// SUBSCRIPTION TIERS
// ============================================================================

export const SUBSCRIPTION_FEATURES = {
  free: {
    maxWatchlistSize: 10,
    aiMessagesPerDay: 10,
    portfolioTracking: false,
    advancedCharts: false,
    realTimeAlerts: false,
    prioritySupport: false,
  },
  pro: {
    maxWatchlistSize: 50,
    aiMessagesPerDay: -1, // Unlimited
    portfolioTracking: true,
    advancedCharts: true,
    realTimeAlerts: true,
    prioritySupport: false,
  },
  premium: {
    maxWatchlistSize: -1, // Unlimited
    aiMessagesPerDay: -1, // Unlimited
    portfolioTracking: true,
    advancedCharts: true,
    realTimeAlerts: true,
    prioritySupport: true,
  },
} as const;

// ============================================================================
// APP METADATA
// ============================================================================

export const APP_INFO = {
  NAME: 'Quanta',
  TAGLINE: 'AI-Powered Stock Investment Advice',
  DESCRIPTION: 'Get personalized stock investment recommendations based on your budget and strategy.',
  VERSION: '1.0.0',
  AUTHOR: 'Your Name',
  GITHUB: 'https://github.com/JoeCapo/quanta',
} as const;
