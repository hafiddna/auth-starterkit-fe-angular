import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { DashboardComponent } from "./dashboard/dashboard.component";

export const PagesRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
      urls: [
        { title: 'Home', url: '/dashboard' },
        { title: 'Dashboard' },
      ],
    },
  },
];
