import { Routes } from '@angular/router';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PermissionsComponent } from "./user-management/permissions/permissions.component";
import { RolesComponent } from "./user-management/roles/roles.component";
import { UsersComponent } from "./user-management/users/users.component";

export const PagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
      urls: [
        { title: 'Home', url: '/dashboard' },
        { title: 'Dashboard' }
      ]
    }
  },

  {
    path: 'user-management/users',
    component: UsersComponent,
    data: {
      title: 'Users',
      urls: [
        { title: 'Home', url: '/dashboard' },
        { title: 'User Management', url: '/user-management/users' },
        { title: 'Users' }
      ]
    }
  },
  {
    path: 'user-management/roles',
    component: RolesComponent,
    data: {
      title: 'Roles',
      urls: [
        { title: 'Home', url: '/dashboard' },
        { title: 'User Management', url: '/user-management/users' },
        { title: 'Roles' }
      ]
    }
  },
  {
    path: 'user-management/permissions',
    component: PermissionsComponent,
    data: {
      title: 'Permissions',
      urls: [
        { title: 'Home', url: '/dashboard' },
        { title: 'User Management', url: '/user-management/users' },
        { title: 'Permissions' }
      ]
    }
  },

  // TODO: Add profile route
];
