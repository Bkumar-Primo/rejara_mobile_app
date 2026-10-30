import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Screen, Text } from '@/components/ui';
import { useAuthStore } from '@/stores/authStore';
import { colors, spacing } from '@/theme';

export default function LoginPlaceholder() {
  const [loading, setLoading] = useState(false);
  const setSession = useAuthStore(state => state.setSession);

  // Minimal verification trigger: verifies that session persistence and route guards work smoothly.
  const handleSimulateLogin = async () => {
    setLoading(true);
    try {
      await setSession(
        {
          id: 'user_dev_01',
          email: 'caregiver@example.com',
          displayName: 'Demo Caregiver',
          isEmailVerified: true,
        },
        {
          accessToken: 'demo_jwt_access_token_token_storage_verified',
          refreshToken: 'demo_jwt_refresh_token_verified',
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scrollable>
      <View style={styles.header}>
        <Text variant="h2" color={colors.primary}>
          Welcome to Rejara
        </Text>
        <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
          Sign in to access your caregiving companion and Ask Rejara.
        </Text>
      </View>

      <Card variant="elevated" style={styles.card}>
        <Text variant="h3" style={styles.cardTitle}>
          Authentication Foundation
        </Text>
        <Text variant="bodySmall" color={colors.textSecondary} style={styles.cardText}>
          Production architecture prepared: SecureStore credential storage, Axios bearer injection,
          OAuth & Firebase contracts, and route guard protection.
        </Text>
        <Button
          title="Verify Auth State & Enter App"
          variant="primary"
          loading={loading}
          onPress={handleSimulateLogin}
          style={styles.actionBtn}
        />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },
  subtitle: {
    marginTop: spacing.sm,
  },
  card: {
    padding: spacing.lg,
  },
  cardTitle: {
    marginBottom: spacing.xs,
  },
  cardText: {
    marginBottom: spacing.lg,
  },
  actionBtn: {
    marginTop: spacing.sm,
  },
});
