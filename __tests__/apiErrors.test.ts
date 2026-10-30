import type { InternalAxiosRequestConfig } from 'axios';
import { normalizeApiError } from '@/services/api/errors';

describe('API Error Normalization', () => {
  it('should normalize standard JavaScript Error', () => {
    const error = new Error('Network request failed');
    const normalized = normalizeApiError(error);

    expect(normalized.message).toBe('Network request failed');
    expect(normalized.isUnauthorized).toBe(false);
    expect(normalized.isNetworkError).toBe(false);
  });

  it('should normalize unknown error fallback', () => {
    const normalized = normalizeApiError('random string error');

    expect(normalized.message).toBe('An unknown error occurred.');
    expect(normalized.isUnauthorized).toBe(false);
  });

  it('should identify 401 unauthorized status from Axios error structure', () => {
    const axiosErrorMock = {
      isAxiosError: true,
      name: 'AxiosError',
      message: 'Request failed with status code 401',
      response: {
        status: 401,
        statusText: 'Unauthorized',
        data: { message: 'Token expired or invalid' },
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      },
    };

    const normalized = normalizeApiError(axiosErrorMock);
    expect(normalized.isUnauthorized).toBe(true);
    expect(normalized.status).toBe(401);
    expect(normalized.message).toBe('Token expired or invalid');
  });

  it('should identify network error when response is missing but request exists', () => {
    const networkErrorMock = {
      isAxiosError: true,
      name: 'AxiosError',
      message: 'Network Error',
      request: {},
      response: undefined,
    };

    const normalized = normalizeApiError(networkErrorMock);
    expect(normalized.isNetworkError).toBe(true);
    expect(normalized.isUnauthorized).toBe(false);
  });
});
