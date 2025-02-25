import { Routes } from '@angular/router';
import { AppErrorComponent } from './error/error.component';
import { AppForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';

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
    ],
  },
];
