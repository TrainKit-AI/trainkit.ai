import { InjectionToken } from '@angular/core';

export type Environment = {
  production: boolean;
  apiBaseUrl: string;
};

export const ENVIRONMENT = new InjectionToken<Environment>(
  'Environment Configuration'
);
