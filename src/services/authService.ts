// src/services/authService.ts

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type User,
  type UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { UserProfile } from '../types';
import { ERROR_MESSAGES } from '../utils/constants';

/**
 * Sign up a new user with email and password
 */
export async function signup(
  email: string,
  password: string,
  displayName: string
): Promise<UserCredential> {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update user profile with display name
    await updateProfile(userCredential.user, { displayName });

    // Create user profile in Firestore
    await createUserProfile(userCredential.user, displayName);

    return userCredential;
  } catch (error: any) {
    throw handleAuthError(error);
  }
}

/**
 * Log in an existing user
 */
export async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw handleAuthError(error);
  }
}

/**
 * Log out the current user
 */
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw handleAuthError(error);
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw handleAuthError(error);
  }
}

/**
 * Create user profile in Firestore
 */
async function createUserProfile(
  user: User,
  displayName: string
): Promise<void> {
  const userProfile: UserProfile = {
    uid: user.uid,
    email: user.email!,
    displayName,
    investmentStrategy: 'index', // Default strategy
    monthlyBudget: 1000, // Default budget
    watchlist: [],
    subscriptionTier: 'free',
    createdAt: serverTimestamp() as any,
    updatedAt: serverTimestamp() as any,
  };

  await setDoc(doc(db, 'users', user.uid), userProfile);
}

/**
 * Get user profile from Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
}

/**
 * Update user profile in Firestore
 */
export async function updateUserProfile(
  uid: string,
  updates: Partial<UserProfile>
): Promise<void> {
  try {
    const docRef = doc(db, 'users', uid);
    await setDoc(
      docRef,
      {
        ...updates,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Handle Firebase Auth errors and return user-friendly messages
 */
function handleAuthError(error: any): Error {
  const errorCode = error.code;

  switch (errorCode) {
    case 'auth/invalid-email':
      return new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    case 'auth/user-disabled':
      return new Error('This account has been disabled.');
    case 'auth/user-not-found':
      return new Error(ERROR_MESSAGES.AUTH.USER_NOT_FOUND);
    case 'auth/wrong-password':
      return new Error(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);
    case 'auth/email-already-in-use':
      return new Error(ERROR_MESSAGES.AUTH.EMAIL_IN_USE);
    case 'auth/weak-password':
      return new Error(ERROR_MESSAGES.AUTH.WEAK_PASSWORD);
    case 'auth/network-request-failed':
      return new Error(ERROR_MESSAGES.AUTH.NETWORK_ERROR);
    case 'auth/too-many-requests':
      return new Error(
        'Too many failed login attempts. Please try again later.'
      );
    default:
      return new Error(ERROR_MESSAGES.AUTH.GENERIC);
  }
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
