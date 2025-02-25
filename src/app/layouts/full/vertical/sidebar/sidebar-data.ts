import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'home',
    route: '/dashboard',
  },
  {
    navCap: 'Apps',
  },
  {
    displayName: 'User Management',
    iconName: 'users-group',
    route: '/user-management',
    children: [
      {
        displayName: 'Users',
        iconName: 'users',
        route: '/user-management/users',
      },
      {
        displayName: 'Roles',
        iconName: 'certificate',
        route: '/user-management/roles',
      },
      {
        displayName: 'Permissions',
        iconName: 'shield-check',
        route: '/user-management/permissions',
      }
    ]
  }
];
