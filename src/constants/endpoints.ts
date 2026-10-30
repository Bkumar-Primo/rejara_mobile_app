/**
 * Rejara Backend API Endpoints
 * Synchronized with rejara-frontend (src/Constants/ApiEndpoints.js)
 */

export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/user-login',
    SIGNUP: '/api/auth/user-signup',
    SIGNUP_CONTEXT: '/api/auth/signup-context',
    LOGIN_CONTEXT: '/api/auth/login-context',
    GOOGLE_AUTH: '/api/auth/social-auth/google',
    VERIFY_OTP: '/api/auth/user-verify-otp',
    RESEND_OTP: '/api/auth/resend-otp',
    RESET_PASSWORD: '/api/auth/reset-password',
    CREATE_PASSWORD: '/api/auth/create-password',
    LOGOUT: (userId: string) => `/api/auth/user-logout?id=${userId}`,
  },
  ASK_REJARA: {
    ASK: '/api/consumer/ask-rejara',
    STREAM: '/api/consumer/ask-rejara/stream',
    HISTORY: (userId: string) => `/api/consumer/ask-rejara/history/${userId}`,
    RESOURCES_SELECTED: '/api/consumer/ask-rejara/resources/selected',
    CONFIRM_TASKS: '/api/consumer/micro-guidance/confirm-tasks',
  },
  TASKS: {
    LIST: '/api/tasks/tasks',
    USER_TASKS: '/api/tasks/user/tasks',
    CREATE: '/api/tasks/task-create',
    TASK_BY_ID: (taskId: string) => `/api/tasks/task/${taskId}`,
    TASK_DETAILS: (taskId: string) => `/api/tasks/task-details/${taskId}`,
    UPDATE: (taskId: string, instanceId: string) =>
      `/api/tasks/task/${taskId}/instances/${instanceId}`,
    DELETE: (taskInstanceId: string) => `/api/tasks/task-remove?taskInstanceId=${taskInstanceId}`,
    PLAN_COUNTS: '/api/tasks/plan-counts',
    CUSTOM_PLANS: '/api/tasks/custom-plans',
  },
} as const;
