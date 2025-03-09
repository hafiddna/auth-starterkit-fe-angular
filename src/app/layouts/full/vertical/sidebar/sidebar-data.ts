import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
    permissions: [
      'read:dashboard'
    ]
  },
  {
    displayName: 'Dashboard',
    iconName: 'home',
    route: '/dashboard',
    permissions: [
      'read:dashboard'
    ]
  },
  {
    navCap: 'Apps',
    permissions: [
      '*:users',
      '*:roles',
      '*:permissions',
    ]
  },
  {
    displayName: 'User Management',
    iconName: 'users-group',
    route: '/user-management',
    permissions: [
      '*:users',
      '*:roles',
      '*:permissions',
    ],
    children: [
      {
        displayName: 'Users',
        iconName: 'users',
        route: '/user-management/users',
        permissions: [
          '*:users',
        ]
      },
      {
        displayName: 'Roles',
        iconName: 'certificate',
        route: '/user-management/roles',
        permissions: [
          '*:roles',
        ]
      },
      {
        displayName: 'Permissions',
        iconName: 'shield-check',
        route: '/user-management/permissions',
        permissions: [
          '*:permissions',
        ]
      }
    ]
  }
];
