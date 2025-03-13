import { Routes } from '@angular/router';
import { AppErrorComponent } from './error/error.component';
import { AppForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AppResetPasswordComponent } from "./reset-password/reset-password.component";
import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { AppVerifyCredentialComponent } from "./verify-credential/verify-credential.component";
import {NotFoundComponent} from "./not-found/not-found.component";

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'error',
        component: AppErrorComponent
      },

      {
        path: 'login',
        component: AppSideLoginComponent
      },
      {
        path: 'register',
        component: AppSideRegisterComponent
      },
      {
        path: 'forgot-password',
        component: AppForgotPasswordComponent
      },
      {
        path: 'reset-password/:token',
        component: AppResetPasswordComponent
      },
      {
        path: 'verify-credential/:token',
        component: AppVerifyCredentialComponent
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];
