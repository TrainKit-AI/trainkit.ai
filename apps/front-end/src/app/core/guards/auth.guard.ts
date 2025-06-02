import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../auth/services/authentication.service';
import { AUTHENTICATION_PATHS } from '../constants/paths.constants';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.getToken()) {
    return true;
  }

  router.navigate(['/', AUTHENTICATION_PATHS.signIn]);
  return false;
};
