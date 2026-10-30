import { Redirect } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { LoadingSpinner, Text } from '@/components/ui';
import { useAuth } from '@/providers/AuthProvider';
import { colors, spacing } from '@/theme';

export default function Index() {
  const { status } = useAuth();

  if (status === 'idle' || status === 'loading') {
    return (
      <View style={styles.container}>
        <View style={styles.brandBox}>
          <Text variant="h1" color={colors.primary} align="center">
            Rejara
          </Text>
          <Text
            variant="subtitle"
            color={colors.textSecondary}
            align="center"
            style={styles.tagline}
          >
            AI-Assisted Caregiving
          </Text>
        </View>
        <LoadingSpinner label="Preparing your care companion..." />
      </View>
    );
  }

  if (status === 'authenticated') {
    return <Redirect href="/(protected)" />;
  }

  return <Redirect href="/(auth)/login" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.xl,
  },
  brandBox: {
    marginBottom: spacing.xxl,
    alignItems: 'center',
  },
  tagline: {
    marginTop: spacing.xs,
  },
});
