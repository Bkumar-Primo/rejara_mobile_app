import * as SecureStore from 'expo-secure-store';
import { tokenStorage } from '@/services/auth/tokenStorage';

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
  AFTER_FIRST_UNLOCK: 'AFTER_FIRST_UNLOCK',
}));

describe('Token Storage Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should store access token in SecureStore with key protection', async () => {
    await tokenStorage.setAccessToken('sample-access-token');

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'rejara.auth.access_token',
      'sample-access-token',
      expect.objectContaining({
        keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
      })
    );
  });

  it('should retrieve access token from SecureStore', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce('retrieved-token');

    const token = await tokenStorage.getAccessToken();
    expect(token).toBe('retrieved-token');
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith('rejara.auth.access_token');
  });

  it('should clear tokens from SecureStore on logout', async () => {
    await tokenStorage.clearTokens();

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('rejara.auth.access_token');
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('rejara.auth.refresh_token');
  });
});
