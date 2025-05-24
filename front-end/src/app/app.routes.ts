import { Routes } from '@angular/router';
import { Error404Component } from './core/components/error-404/error-404.component';
import {
  AUTHENTICATION_PATHS,
  ROOT_PATHS,
} from './core/constants/paths.constants';
import { HomeComponent } from './features/home/pages/home/home.component';

export const routes: Routes = [
  {
    path: ROOT_PATHS.home,
    component: HomeComponent,
  },
  {
    path: AUTHENTICATION_PATHS.signIn,
    component: HomeComponent,
  },
  {
    path: AUTHENTICATION_PATHS.signUp,
    component: HomeComponent,
  },
  { path: ROOT_PATHS.error404, component: Error404Component },
  { path: '**', redirectTo: ROOT_PATHS.error404 },
];
