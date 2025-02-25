import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TokenService } from "./token.service";
import { environment } from "../../environments/environment";
import { UserProfile } from "../interfaces/user-profile";
import { BaseResponse } from "../interfaces/base-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // API call to refresh token
  refreshToken(refreshToken: string): Observable<BaseResponse<{ access_token: string; refresh_token: string }>> {
    return this.http.post<BaseResponse<{ access_token: string; refresh_token: string }>>(
      // TODO: Decrypt data on production
      `${this.apiUrl}/refresh-token`,
      { refresh_token: refreshToken }
    ).pipe(
      tap((tokens) => {
        this.tokenService.setAccessToken(tokens.data.access_token);
        this.tokenService.setRefreshToken(tokens.data.refresh_token).then(() => {});
      })
    );
  }

  // Login and save tokens
  login(credentials: { credential: string; password: string; remember: boolean }) {
    return this.http.post<BaseResponse<{ access_token: string; refresh_token: string }>>(
      // TODO: Decrypt data on production
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap((tokens) => {
        this.tokenService.setAccessToken(tokens.data.access_token);
        this.tokenService.setRefreshToken(tokens.data.refresh_token).then(() => {});
      })
    );
  }

  // Logout and clear tokens
  logout() {
    return this.http.post<{ status_code: number; message: string }>(
      `${this.apiUrl}/logout`,
      null,
    ).pipe(
      tap(() => {
        this.tokenService.clearAccessToken();
        this.tokenService.clearRefreshToken().then(() => {});
      })
    );
  }
}
