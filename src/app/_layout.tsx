import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { QueryProvider } from '@/providers/QueryProvider';
import { colors } from '@/theme';

function RootNavigation() {
  const { status } = useAuth();
  const isAuthenticated = status === 'authenticated';

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'fade',
      }}
    >
      {/* Hydration / Anchor route */}
      <Stack.Screen name="index" />

      {/* Guest/Auth group: protected so authenticated users cannot access auth routes */}
      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Protected application group: guarded so unauthenticated access is rejected and purged */}
      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* Fallback 404 screen */}
      <Stack.Screen
        name="+not-found"
        options={{
          headerShown: true,
          title: 'Not Found',
          headerTintColor: colors.textPrimary,
          headerStyle: { backgroundColor: colors.surface },
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
