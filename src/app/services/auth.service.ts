import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  // API call to refresh token
  refreshToken(refreshToken: string): Observable<{ data: { access_token: string; refresh_token: string } }> {
    return this.http.post<{ data: { access_token: string; refresh_token: string } }>(
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
    return this.http.post<{ data: { access_token: string; refresh_token: string } }>(
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

  getProfile(): Observable<BaseResponse<UserProfile>> {
    return this.http.get<BaseResponse<UserProfile>>(`${this.apiUrl}/profile`)
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
