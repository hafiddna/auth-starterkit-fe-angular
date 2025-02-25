import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, switchMap, from } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CoreService } from "./services/core.service";
import { TokenService } from './services/token.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private options = this.settings.getOptions();

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private settings: CoreService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let appId = localStorage.getItem('appId');
    if (appId) {
      req = req.clone({
        setHeaders: { 'X-App-Id': appId },
      });
    } else {
      const newAppId = crypto.randomUUID();
      req = req.clone({
        setHeaders: { 'X-App-Id': newAppId },
      });
      localStorage.setItem('appId', newAppId);
    }

    req = req.clone({
      setHeaders: { 'X-Device-Category': 'Web' },
    });

    // Determine device type based on window width
    const width = window.innerWidth;
    let deviceType = 'Desktop Browser';
    if (width <= 768) {
      deviceType = 'Mobile Browser';
    } else if (width <= 1024) {
      deviceType = 'Tablet Browser';
    }

    req = req.clone({
      setHeaders: {
        'X-Device-Type': deviceType,
        'Accept-Language': this.options.language,
      },
    });

    let accessToken = this.tokenService.getAccessToken();
    // Set Authorization header if access token exists
    if (accessToken) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next)
        }

        return throwError(() => error)
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return from(this.tokenService.getRefreshToken()).pipe(
        switchMap((refreshToken) => {
          if (!refreshToken) {
            this.isRefreshing = false;
            return this.authService.logout();
          }

          return this.authService.refreshToken(refreshToken).pipe(
            switchMap(() => {
              this.isRefreshing = false;
              return next.handle(req);
            }),
            catchError((error) => {
              this.isRefreshing = false;
              this.authService.logout();
              return throwError(() => error)
            })
          );
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.logout();
          return throwError(() => error)
        })
      );
    }

    return next.handle(req);
  }
}
