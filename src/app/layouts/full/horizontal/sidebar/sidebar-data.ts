import { NavItem } from '../../vertical/sidebar/nav-item/nav-item';

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
    route: '/user-management/users',
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
