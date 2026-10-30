/**
 * User and Authentication Types
 * Synchronized with backend responses and web userSlice (rejara-frontend)
 */
export interface User {
  id: string;
  userId?: string;
  email: string;
  emailAddress?: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  phone?: string | null;
  photoUrl?: string;
  userImage?: string;
  platformId?: number | null;
  platformName?: string;
  isEmailVerified?: boolean;
  needsProfileOnboarding?: boolean;
  isFacilityUser?: boolean;
  createdAt?: string;
}

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthState {
  status: AuthStatus;
  user: User | null;
  accessToken: string | null;
  error: string | null;
}
