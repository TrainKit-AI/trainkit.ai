import { inject } from '@angular/core';
import type { Environment } from '../tokens/environment.token';
import { ENVIRONMENT } from '../tokens/environment.token';

export const getEndpoints = () => {
  const environment = inject<Environment>(ENVIRONMENT);
  return {
    auth: {
      signup: `${environment.apiBaseUrl}/auth/signup`,
      login: `${environment.apiBaseUrl}/auth/login`,
      verify: `${environment.apiBaseUrl}/auth/verify`,
      resendVerification: `${environment.apiBaseUrl}/auth/resend-verification`,
      resetPassword: `${environment.apiBaseUrl}/auth/reset-password`,
      forgotPassword: `${environment.apiBaseUrl}/auth/forgot-password`,
    },
    users: {
      users: `${environment.apiBaseUrl}/users`,
      me: `${environment.apiBaseUrl}/users/me`,
    },
  } as const;
};
