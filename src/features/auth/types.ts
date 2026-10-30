import type { AuthTokens } from '@/services/auth/tokenStorage';
import type { User } from '@/types/auth';

export interface LoginCredentials {
  email: string;
  password: string;
  timezone?: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  timezone?: string;
}

export interface AuthSessionResponse {
  user: User;
  tokens: AuthTokens;
}

export interface GoogleAuthPayload {
  idToken: string;
  serverAuthCode?: string;
  timezone?: string;
}
