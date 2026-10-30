import {
  type AxiosInstance,
  type AxiosRequestConfig,
  create,
  type InternalAxiosRequestConfig,
} from 'axios';
import { env } from '@/config/env';
import { APP_CONFIG } from '@/constants';
import { tokenStorage } from '@/services/auth/tokenStorage';
import { normalizeApiError } from './errors';

type UnauthorizedHandler = () => void | Promise<void>;
let onUnauthorizedCallback: UnauthorizedHandler | null = null;

export function registerUnauthorizedHandler(handler: UnauthorizedHandler): () => void {
  onUnauthorizedCallback = handler;
  return () => {
    onUnauthorizedCallback = null;
  };
}

/**
 * Factory creating an Axios client pre-wired with Bearer token authentication
 * and 401 unauthorized handling matching the Rejara multi-service architecture.
 */
export function createServiceApiClient(
  baseURL: string,
  timeoutMs: number = APP_CONFIG.API_TIMEOUT_MS
): AxiosInstance {
  const instance: AxiosInstance = create({
    baseURL,
    timeout: timeoutMs,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  // Request interceptor: attach Bearer token from SecureStore
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const token = await tokenStorage.getAccessToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.warn('[ApiClient] Failed to retrieve auth token for request:', err);
      }
      return config;
    },
    error => Promise.reject(normalizeApiError(error))
  );

  // Response interceptor: handle 401 unauthorized & normalize errors
  instance.interceptors.response.use(
    response => response,
    async error => {
      const normalized = normalizeApiError(error);

      if (normalized.isUnauthorized && onUnauthorizedCallback) {
        try {
          await onUnauthorizedCallback();
        } catch (callbackErr) {
          console.error('[ApiClient] Error running unauthorized callback:', callbackErr);
        }
      }

      return Promise.reject(normalized);
    }
  );

  return instance;
}

// Core Rejara Service Clients (matching web frontend structure)
export const apiClient: AxiosInstance = createServiceApiClient(env.apiUrl);
export const authClient: AxiosInstance = createServiceApiClient(env.authUrl);
export const guidanceClient: AxiosInstance = createServiceApiClient(env.guidanceUrl, 60_000);
export const tasksClient: AxiosInstance = createServiceApiClient(env.tasksUrl);

/**
 * Creates an AbortController signal helper for cancellable requests.
 */
export function createRequestSignal(): {
  signal: AbortSignal;
  cancel: (reason?: string) => void;
} {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    cancel: reason => controller.abort(reason),
  };
}

/**
 * Type-safe API request helpers
 */
export async function getRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.get<T>(url, config);
  return response.data;
}

export async function postRequest<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.post<T>(url, data, config);
  return response.data;
}

export async function putRequest<T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await apiClient.put<T>(url, data, config);
  return response.data;
}

export async function deleteRequest<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.delete<T>(url, config);
  return response.data;
}
