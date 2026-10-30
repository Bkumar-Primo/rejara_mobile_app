import { create } from 'zustand';
import { registerUnauthorizedHandler } from '@/services/api/client';
import { type AuthTokens, tokenStorage } from '@/services/auth/tokenStorage';
import type { AuthState, User } from '@/types/auth';

interface AuthActions {
  hydrate: () => Promise<void>;
  setSession: (user: User, tokens: AuthTokens) => Promise<void>;
  clearSession: () => Promise<void>;
  setError: (error: string | null) => void;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => {
  // Wire 401 callback to auto-clear session
  registerUnauthorizedHandler(async () => {
    if (get().status === 'authenticated') {
      await get().clearSession();
    }
  });

  return {
    status: 'idle',
    user: null,
    accessToken: null,
    error: null,

    hydrate: async () => {
      try {
        set({ status: 'loading' });
        const tokens = await tokenStorage.getTokens();

        if (!tokens?.accessToken) {
          set({
            status: 'unauthenticated',
            user: null,
            accessToken: null,
            error: null,
          });
          return;
        }

        // Token exists. In future phases, user profile can be fetched via /auth/me or validated token.
        // For foundational hydration, acknowledge valid stored session.
        set({
          status: 'authenticated',
          accessToken: tokens.accessToken,
          error: null,
        });
      } catch (err) {
        console.error('[AuthStore] Hydration failure:', err);
        set({
          status: 'unauthenticated',
          user: null,
          accessToken: null,
          error: 'Failed to restore previous authentication session.',
        });
      }
    },

    setSession: async (user: User, tokens: AuthTokens) => {
      try {
        await tokenStorage.setTokens(tokens);
        set({
          status: 'authenticated',
          user,
          accessToken: tokens.accessToken,
          error: null,
        });
      } catch (err) {
        console.error('[AuthStore] Failed to save session:', err);
        set({ error: 'Failed to persist authentication credentials.' });
        throw err;
      }
    },

    clearSession: async () => {
      try {
        await tokenStorage.clearTokens();
      } catch (err) {
        console.error('[AuthStore] Error clearing token storage:', err);
      } finally {
        set({
          status: 'unauthenticated',
          user: null,
          accessToken: null,
          error: null,
        });
      }
    },

    setError: (error: string | null) => {
      set({ error });
    },
  };
});
