import { Routes } from '@angular/router';
import { AppChangePasswordComponent } from "./change-password/change-password.component";
import { AppErrorComponent } from './error/error.component';
import { AppForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import { AppVerifyEmailComponent } from "./verify-email/verify-email.component";

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
        path: 'change-password/:token',
        component: AppChangePasswordComponent
      },
      {
        path: 'verify-email/:token',
        component: AppVerifyEmailComponent
      },
    ],
  },
];
