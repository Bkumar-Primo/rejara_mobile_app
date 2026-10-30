import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Screen, Text } from '@/components/ui';
import { useAuth } from '@/providers/AuthProvider';
import { colors, spacing } from '@/theme';

export default function AskRejaraHomeScreen() {
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text variant="h2" color={colors.primary}>
          Ask Rejara
        </Text>
        <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
          Your central AI caregiving assistant
        </Text>
      </View>

      <Card variant="elevated" style={styles.statusCard}>
        <Text variant="label" color={colors.accent}>
          AUTHENTICATED SESSION ACTIVE
        </Text>
        <Text variant="h3" style={styles.userName}>
          {user?.displayName ?? user?.email ?? 'Caregiver'}
        </Text>
        <Text variant="bodySmall" color={colors.textSecondary}>
          Central Ask Rejara conversational core is wired as the primary entry point for all
          caregiving capabilities.
        </Text>
      </Card>

      <Card variant="outlined" style={styles.infoCard}>
        <Text variant="label" color={colors.textMuted}>
          ARCHITECTURE STATUS
        </Text>
        <Text variant="bodySmall" color={colors.textSecondary} style={styles.infoText}>
          • File-based routing with route protection: Active{'\n'}• TanStack Query & Zustand: Ready
          {'\n'}• SecureStore encrypted credentials: Active{'\n'}• Axios client with auto-injected
          Bearer tokens: Ready
        </Text>
      </Card>

      <Button
        title="Sign Out"
        variant="outline"
        loading={loggingOut}
        onPress={handleLogout}
        style={styles.logoutBtn}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginVertical: spacing.lg,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  statusCard: {
    marginBottom: spacing.base,
  },
  userName: {
    marginVertical: spacing.xs,
  },
  infoCard: {
    marginBottom: spacing.xl,
  },
  infoText: {
    marginTop: spacing.xs,
    lineHeight: 22,
  },
  logoutBtn: {
    marginTop: spacing.sm,
  },
});
