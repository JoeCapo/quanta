// ============================================================================
// USER TYPES
// ============================================================================

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
}

export interface UserProfile extends User {
  monthlyBudget: number;
  investmentStrategy: InvestmentStrategy;
  watchlist: string[]; // Array of stock symbols
  riskTolerance?: "low" | "medium" | "high";
  preferences?: UserPreferences;
}

export interface UserPreferences {
  theme?: "light" | "dark" | "system";
  notifications?: boolean;
  emailAlerts?: boolean;
}

// ============================================================================
// INVESTMENT STRATEGY TYPES
// ============================================================================

export type InvestmentStrategy = "dividend" | "growth" | "value" | "index";

export interface StrategyOption {
  id: InvestmentStrategy;
  name: string;
  description: string;
  icon: string;
  characteristics?: string[];
}

// ============================================================================
// STOCK TYPES
// ============================================================================

export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  lastUpdated: Date;
}

export interface StockDetail extends Stock {
  open: number;
  high: number;
  low: number;
  previousClose: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  peRatio?: number;
  eps?: number;
  dividendYield?: number;
  sector?: string;
  industry?: string;
}

export interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High
  l: number; // Low
  o: number; // Open
  pc: number; // Previous close
  t: number; // Timestamp
}

// ============================================================================
// AI CHAT TYPES
// ============================================================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface AIRequest {
  budget: number;
  strategy: InvestmentStrategy;
  message: string;
  context?: ChatMessage[];
  userProfile?: Partial<UserProfile>;
}

export interface AIResponse {
  message: string;
  recommendations?: StockRecommendation[];
  timestamp: Date;
  confidence?: number;
}

export interface StockRecommendation {
  symbol: string;
  name: string;
  reasoning: string;
  allocation?: number; // Percentage of budget
  targetPrice?: number;
  riskLevel?: "low" | "medium" | "high";
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
  timestamp?: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: unknown;
}

// ============================================================================
// LOADING AND ERROR STATES
// ============================================================================

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}

// ============================================================================
// FORM TYPES
// ============================================================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData extends LoginFormData {
  displayName: string;
  confirmPassword: string;
}

export interface ProfileFormData {
  displayName: string;
  monthlyBudget: number;
  investmentStrategy: InvestmentStrategy;
  riskTolerance: "low" | "medium" | "high";
}

// ============================================================================
// ROUTE TYPES
// ============================================================================

export interface RouteConfig {
  path: string;
  title: string;
  protected: boolean;
}

// ============================================================================
// SUBSCRIPTION TYPES (for future v2)
// ============================================================================

export type SubscriptionTier = "free" | "pro" | "premium";

export interface Subscription {
  tier: SubscriptionTier;
  status: "active" | "inactive" | "cancelled" | "past_due";
  expiresAt?: Date;
  features: string[];
}

export interface FeatureAccess {
  unlimitedWatchlist: boolean;
  unlimitedAIChat: boolean;
  portfolioTracking: boolean;
  advancedCharts: boolean;
  realTimeAlerts: boolean;
}
