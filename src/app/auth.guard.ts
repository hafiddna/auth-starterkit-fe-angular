import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { catchError, of, switchMap, from } from "rxjs";
import { AuthService } from "./services/auth.service";
import { TokenService } from "./services/token.service";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const accessToken = tokenService.getAccessToken();
  if (accessToken) {
    return of(true);
  }

  // Convert the refreshToken Promise to an observable
  return from(tokenService.getRefreshToken()).pipe(
    switchMap((refreshToken) => {
      if (!refreshToken) {
        router.navigate(['/login', { queryParams: { redirect: state.url } }]);
        return of(false); // Redirect to login if no refresh token
      }

      // Call refreshToken API
      return authService.refreshToken(refreshToken).pipe(
        switchMap(() => of(true)), // On success, allow navigation
        catchError(() => {
          router.navigate(['/login', { queryParams: { redirect: state.url } }]);
          return of(false); // On error, redirect to login
        })
      );
    }),
    catchError(() => {
      router.navigate(['/login'], { queryParams: { redirect: state.url } });
      return of(false);
    })
  );
};
