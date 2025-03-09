import { NavItem } from '../../vertical/sidebar/nav-item/nav-item';

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
  // {
  //   displayName: 'Menu Level',
  //   iconName: 'box-multiple',
  //   route: '/menu-level',
  //   children: [
  //     {
  //       displayName: 'Menu 1',
  //       iconName: 'point',
  //       route: '/menu-1',
  //       children: [
  //         {
  //           displayName: 'Menu 1',
  //           iconName: 'point',
  //           route: '/menu-1',
  //         },
  //
  //         {
  //           displayName: 'Menu 2',
  //           iconName: 'point',
  //           route: '/menu-2',
  //         },
  //       ],
  //     },
  //
  //     {
  //       displayName: 'Menu 2',
  //       iconName: 'point',
  //       route: '/menu-2',
  //     },
  //   ],
  // },
  // {
  //   displayName: 'Disabled',
  //   iconName: 'ban',
  //   route: '/disabled',
  //   disabled: true,
  // },
];
