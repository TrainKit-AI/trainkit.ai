import { Routes } from '@angular/router';
import { Error404Component } from './core/components/error-404/error-404.component';
import {
  AUTHENTICATION_PATHS,
  ROOT_PATHS,
} from './core/constants/paths.constants';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/pages/home/home.component';

export const routes: Routes = [
  {
    path: ROOT_PATHS.home,
    component: HomeComponent,
  },
  {
    path: AUTHENTICATION_PATHS.signIn,
    loadComponent: () =>
      import('./features/signin/pages/signin/signin.component').then(
        (m) => m.SigninComponent
      ),
  },
  {
    path: AUTHENTICATION_PATHS.signUp,
    loadComponent: () =>
      import('./features/signup/pages/signup/signup.component').then(
        (m) => m.SignupComponent
      ),
  },
  {
    path: AUTHENTICATION_PATHS.verify,
    loadComponent: () =>
      import('./features/verify/pages/verify/verify.component').then(
        (m) => m.VerifyComponent
      ),
  },
  {
    path: AUTHENTICATION_PATHS.dashboard,
    loadComponent: () =>
      import('./features/dashboard/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: AUTHENTICATION_PATHS.forgotPassword,
    loadComponent: () =>
      import(
        './features/forgot-password/pages/forgot-password/forgot-password.component'
      ).then((m) => m.ForgotPasswordComponent),
  },
  {
    path: AUTHENTICATION_PATHS.resetPassword,
    loadComponent: () =>
      import(
        './features/reset-password/pages/reset-password/reset-password.component'
      ).then((m) => m.ResetPasswordComponent),
  },
  { path: ROOT_PATHS.error404, component: Error404Component },
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];
