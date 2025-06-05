export const ROOT_PATHS = {
  home: '',
  error404: '404',
};

export const LEGAL_PATHS = {
  legal: 'legal/terms',
  privacy: 'legal/privacy',
  cookie: 'legal/cookie',
  product: 'legal/product-terms',
};

export const DASHBOARD_PATHS = {
  dataset: 'dataset',
  evaluation: 'evaluation',
};

export const AUTHENTICATION_PATHS = {
  signIn: 'signin',
  signUp: 'signup',
  verify: 'verify',
  dashboard: 'dashboard',
  resetPassword: 'reset-password',
  forgotPassword: 'forgot-password',
} as const;
