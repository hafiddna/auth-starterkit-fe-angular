import {HttpHandlerFn, HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from "./services/token.service";
import { AuthService } from "./services/auth.service";
import { HttpRequest } from '@angular/common/http';
import { from, lastValueFrom, switchMap } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);

  return from(handleRequest(req, tokenService, authService)).pipe(
    switchMap((updatedReq) => next(updatedReq))
  );
};

async function handleRequest(
  req: HttpRequest<any>,
  tokenService: TokenService,
  authService: AuthService
): Promise<HttpRequest<any>> {
  let accessToken = tokenService.getAccessToken();

  // If access token is missing, try refreshing it using the refresh token from IndexedDB
  if (!accessToken) {
    const refreshToken = await tokenService.getRefreshToken();

    if (refreshToken) {
      try {
        const newTokens = await authService.refreshToken(refreshToken).toPromise();

        if (newTokens) {
          tokenService.setAccessToken(newTokens.accessToken);
          tokenService.setRefreshToken(newTokens.refreshToken);
          accessToken = newTokens.accessToken;
        }
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }
  }

  // Clone the request and add the Authorization header if the access token is available
  if (accessToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  // Set user agent
  req = req.clone({
    setHeaders: {
      'User-Agent': navigator.userAgent,
      'X-Device-Category': 'Web',
    },
  });

  // Reading window width and height, to set "X-Device-Type" header
  const width = window.innerWidth;
  let deviceType = 'Desktop Browser';

  if (width <= 768) {
    deviceType = 'Mobile Browser';
  } else if (width <= 1024) {
    deviceType = 'Tablet Browser';
  }

  // Set device type
  req = req.clone({
    setHeaders: {
      'X-Device-Type': deviceType,
    },
  });

  return req;
}
