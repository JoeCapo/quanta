// src/contexts/AuthContext.tsx

import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { shouldUseMockAuth } from '../config';
import { getCurrentMockUser } from '../services/mockAuthService';
import {
  getUserProfile as getFirebaseProfile,
  updateUserProfile as updateFirebaseProfile,
} from '../services/authService';
import type { UserProfile } from '../types';

interface AuthContextType {
  user: any;
  userProfile: UserProfile | null;
  loading: boolean;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  updateUserProfile: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const useMock = shouldUseMockAuth();

  useEffect(() => {
    if (useMock) {
      // Mock auth mode - check for mock user
      const checkMockUser = () => {
        const mockUser = getCurrentMockUser();
        setUser(mockUser ? { uid: mockUser.uid } : null);
        setUserProfile(mockUser);
        setLoading(false);
      };

      checkMockUser();

      // Poll for changes every second (in real app, we'd use events)
      const interval = setInterval(checkMockUser, 1000);
      return () => clearInterval(interval);
    } else {
      // Real Firebase mode
      const loadFirebase = async () => {
        try {
          const { auth } = await import('../services/firebase');
          const { onAuthStateChanged } = await import('firebase/auth');

          const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);

            if (firebaseUser) {
              const profile = await getFirebaseProfile(firebaseUser.uid);
              setUserProfile(profile);
            } else {
              setUserProfile(null);
            }

            setLoading(false);
          });

          return unsubscribe;
        } catch (error) {
          console.error('Firebase initialization error:', error);
          setLoading(false);
        }
      };

      let unsubscribe: (() => void) | undefined;
      loadFirebase().then(unsub => { unsubscribe = unsub; });

      return () => unsubscribe?.();
    }
  }, [useMock]);

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      throw new Error('No user logged in');
    }

    if (useMock) {
      const { updateMockUserProfile } = await import('../services/mockAuthService');
      await updateMockUserProfile(updates);
    } else {
      await updateFirebaseProfile(user.uid, updates);
    }

    // Update local state
    setUserProfile((prev) => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  };

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
