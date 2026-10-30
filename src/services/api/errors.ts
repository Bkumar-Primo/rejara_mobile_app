import { type AxiosError, isAxiosError } from 'axios';
import type { ApiError } from './types';

export function normalizeApiError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; error?: string; details?: unknown }>;
    const status = axiosError.response?.status;
    const responseData = axiosError.response?.data;

    const message =
      responseData?.message ||
      responseData?.error ||
      axiosError.message ||
      'An unexpected network error occurred.';

    return {
      message,
      status,
      code: axiosError.code,
      details: (responseData?.details as Record<string, unknown>) ?? undefined,
      isNetworkError: !axiosError.response && Boolean(axiosError.request),
      isUnauthorized: status === 401,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      isNetworkError: false,
      isUnauthorized: false,
    };
  }

  return {
    message: 'An unknown error occurred.',
    isNetworkError: false,
    isUnauthorized: false,
  };
}
