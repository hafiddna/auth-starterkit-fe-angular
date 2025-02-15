import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // TODO: Implement authentication logic here
  return true;
};
