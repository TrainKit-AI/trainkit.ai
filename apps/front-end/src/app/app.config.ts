import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { jwtTokenInterceptor } from './core/interceptors/jwt-token.interceptor';
import { ENVIRONMENT } from './core/tokens/environment.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([jwtTokenInterceptor, errorInterceptor])
    ),
    { provide: ENVIRONMENT, useValue: environment },
  ],
};
