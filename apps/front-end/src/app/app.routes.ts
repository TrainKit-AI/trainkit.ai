import { Routes } from '@angular/router';
import { Error404Component } from './core/components/error-404/error-404.component';
import {
  AUTHENTICATION_PATHS,
  DASHBOARD_PATHS,
  DATASET_PATH,
  ROOT_PATHS,
} from './core/constants/paths.constants';
import { authGuard } from './core/guards/auth.guard';
import { AboutComponent } from './features/about/about.component';
import { HomeComponent } from './features/home/pages/home/home.component';
import { PrivacyComponent } from './features/privacy/privacy.component';
import { TermsComponent } from './features/terms/terms.component';
import { TrainkitDataEngineComponent } from './features/trainkit-data-engine/trainkit-data-engine.component';

export const routes: Routes = [
  {
    path: ROOT_PATHS.home,
    component: HomeComponent,
  },
  { path: 'trainkit-data-engine', component: TrainkitDataEngineComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: '', component: HomeComponent },
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
    children: [
      {
        path: '',
        redirectTo: DASHBOARD_PATHS.dataset,
        pathMatch: 'full',
      },
      {
        path: DASHBOARD_PATHS.dataset,
        loadComponent: () =>
          import(
            './features/dashboard/pages/dataset-management/dataset-management.component'
          ).then((m) => m.DatasetManagementComponent),
        children: [
          {
            path: DATASET_PATH.home,
            loadComponent: () =>
              import(
                './features/dashboard/pages/dataset-management/pages/home/home.component'
              ).then((m) => m.HomeComponent),
          },
          {
            path: DATASET_PATH.add,
            loadComponent: () =>
              import(
                './features/dashboard/pages/dataset-management/pages/add-dataset/add-dataset.component'
              ).then((m) => m.AddDatasetComponent),
          },
          {
            path: `:datasetId/${DATASET_PATH.edit}`,
            loadComponent: () =>
              import(
                './features/dashboard/pages/dataset-management/pages/edit-dataset/edit-dataset.component'
              ).then((m) => m.EditDatasetComponent),
          },
          {
            path: ':datasetId',
            loadComponent: () =>
              import(
                './features/dashboard/pages/dataset-management/pages/view-dataset/view-dataset.component'
              ).then((m) => m.ViewDatasetComponent),
          },
          {
            path: `:datasetId/${DATASET_PATH.example.home}/${DATASET_PATH.example.add}`,
            loadComponent: () =>
              import(
                './features/dashboard/pages/dataset-management/pages/add-example/add-example.component'
              ).then((m) => m.AddExampleComponent),
          },
          {
            path: `:datasetId/${DATASET_PATH.example.home}/:exampleId/${DATASET_PATH.example.edit}`,
            loadComponent: () =>
              import(
                './features/dashboard/pages/dataset-management/pages/edit-example/edit-example.component'
              ).then((m) => m.EditExampleComponent),
          },
        ],
      },
    ],
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
