// src/services/mockAuthService.ts
// Mock authentication service for development without Firebase

import type { UserProfile } from '../types';

// Mock user database (in-memory)
const mockUsers = new Map<string, { email: string; password: string; profile: UserProfile }>();

// Current mock user
let currentMockUser: UserProfile | null = null;

/**
 * Mock signup - creates user in memory
 */
export async function mockSignup(
  email: string,
  password: string,
  displayName: string
): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (mockUsers.has(email)) {
    throw new Error('Email already in use');
  }

  const profile: UserProfile = {
    uid: `mock-${Date.now()}`,
    email,
    displayName,
    investmentStrategy: 'index',
    monthlyBudget: 1000,
    watchlist: [],
    subscriptionTier: 'free',
    createdAt: new Date(),
  };

  mockUsers.set(email, { email, password, profile });
  currentMockUser = profile;
}

/**
 * Mock login - validates credentials
 */
export async function mockLogin(email: string, password: string): Promise<void> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const user = mockUsers.get(email);

  if (!user || user.password !== password) {
    throw new Error('Invalid email or password');
  }

  currentMockUser = user.profile;
}

/**
 * Mock logout
 */
export async function mockLogout(): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  currentMockUser = null;
}

/**
 * Get current mock user
 */
export function getCurrentMockUser(): UserProfile | null {
  return currentMockUser;
}

/**
 * Update mock user profile
 */
export async function updateMockUserProfile(updates: Partial<UserProfile>): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));

  if (!currentMockUser) {
    throw new Error('No user logged in');
  }

  currentMockUser = { ...currentMockUser, ...updates };

  // Update in mock database
  const user = mockUsers.get(currentMockUser.email);
  if (user) {
    user.profile = currentMockUser;
  }
}

// Create a default test user
mockUsers.set('test@quanta.com', {
  email: 'test@quanta.com',
  password: 'password123',
  profile: {
    uid: 'mock-test-user',
    email: 'test@quanta.com',
    displayName: 'Test User',
    investmentStrategy: 'growth',
    monthlyBudget: 5000,
    watchlist: ['AAPL', 'GOOGL', 'MSFT'],
    subscriptionTier: 'free',
    createdAt: new Date('2024-01-01'),
  },
});
