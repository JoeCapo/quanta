// src/services/auth.ts
// Unified authentication service that switches between mock and Firebase

import { shouldUseMockAuth } from '../config';
import type { UserProfile } from '../types';

// Import mock auth
import {
  mockSignup,
  mockLogin,
  mockLogout,
  getCurrentMockUser,
  updateMockUserProfile,
} from './mockAuthService';

// Import Firebase auth (will be lazy loaded to avoid errors if not configured)
let firebaseAuth: any = null;

const loadFirebaseAuth = async () => {
  if (!firebaseAuth) {
    const module = await import('./authService');
    firebaseAuth = module;
  }
  return firebaseAuth;
};

/**
 * Sign up a new user
 */
export async function signup(
  email: string,
  password: string,
  displayName: string
): Promise<any> {
  if (shouldUseMockAuth()) {
    return mockSignup(email, password, displayName);
  }

  const fb = await loadFirebaseAuth();
  return fb.signup(email, password, displayName);
}

/**
 * Log in a user
 */
export async function login(email: string, password: string): Promise<any> {
  if (shouldUseMockAuth()) {
    return mockLogin(email, password);
  }

  const fb = await loadFirebaseAuth();
  return fb.login(email, password);
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  if (shouldUseMockAuth()) {
    return mockLogout();
  }

  const fb = await loadFirebaseAuth();
  return fb.logout();
}

/**
 * Get user profile
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  if (shouldUseMockAuth()) {
    return getCurrentMockUser();
  }

  const fb = await loadFirebaseAuth();
  return fb.getUserProfile(uid);
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> {
  if (shouldUseMockAuth()) {
    return updateMockUserProfile(updates);
  }

  const fb = await loadFirebaseAuth();
  return fb.updateUserProfile(uid, updates);
}

/**
 * Get current user
 */
export function getCurrentUser(): any {
  if (shouldUseMockAuth()) {
    return getCurrentMockUser() ? { uid: getCurrentMockUser()!.uid } : null;
  }

  // For Firebase, we'll handle this differently in the context
  return null;
}
