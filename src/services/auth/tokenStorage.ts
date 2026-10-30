import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { STORAGE_KEYS } from '@/constants';

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export interface ITokenStorage {
  getAccessToken(): Promise<string | null>;
  setAccessToken(token: string): Promise<void>;
  getRefreshToken(): Promise<string | null>;
  setRefreshToken(token: string): Promise<void>;
  getTokens(): Promise<AuthTokens | null>;
  setTokens(tokens: AuthTokens): Promise<void>;
  clearTokens(): Promise<void>;
}

class SecureTokenStorage implements ITokenStorage {
  private isAvailable(): boolean {
    // SecureStore is supported natively on iOS and Android.
    // On web it is not supported natively; we gracefully avoid unencrypted leaks.
    return Platform.OS !== 'web';
  }

  async getAccessToken(): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_ACCESS_TOKEN);
    } catch (error) {
      console.error('[TokenStorage] Failed to get access token:', error);
      return null;
    }
  }

  async setAccessToken(token: string): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_ACCESS_TOKEN, token, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
      });
    } catch (error) {
      console.error('[TokenStorage] Failed to store access token:', error);
      throw error;
    }
  }

  async getRefreshToken(): Promise<string | null> {
    if (!this.isAvailable()) {
      return null;
    }
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.AUTH_REFRESH_TOKEN);
    } catch (error) {
      console.error('[TokenStorage] Failed to get refresh token:', error);
      return null;
    }
  }

  async setRefreshToken(token: string): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_REFRESH_TOKEN, token, {
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
      });
    } catch (error) {
      console.error('[TokenStorage] Failed to store refresh token:', error);
      throw error;
    }
  }

  async getTokens(): Promise<AuthTokens | null> {
    const accessToken = await this.getAccessToken();
    if (!accessToken) {
      return null;
    }
    const refreshToken = (await this.getRefreshToken()) ?? undefined;
    return {
      accessToken,
      refreshToken,
    };
  }

  async setTokens(tokens: AuthTokens): Promise<void> {
    await this.setAccessToken(tokens.accessToken);
    if (tokens.refreshToken) {
      await this.setRefreshToken(tokens.refreshToken);
    }
  }

  async clearTokens(): Promise<void> {
    if (!this.isAvailable()) {
      return;
    }
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_ACCESS_TOKEN),
        SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_REFRESH_TOKEN),
      ]);
    } catch (error) {
      console.error('[TokenStorage] Failed to clear tokens:', error);
    }
  }
}

export const tokenStorage = new SecureTokenStorage();
