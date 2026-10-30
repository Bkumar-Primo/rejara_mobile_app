import { createContext, type PropsWithChildren, useContext, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import type { AuthState } from '@/types/auth';

interface AuthContextValue extends AuthState {
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const status = useAuthStore(state => state.status);
  const user = useAuthStore(state => state.user);
  const accessToken = useAuthStore(state => state.accessToken);
  const error = useAuthStore(state => state.error);
  const hydrate = useAuthStore(state => state.hydrate);
  const clearSession = useAuthStore(state => state.clearSession);

  // Hydrate credentials on initial app launch
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const value: AuthContextValue = {
    status,
    user,
    accessToken,
    error,
    logout: clearSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
