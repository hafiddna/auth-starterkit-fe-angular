import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService} from "./token.service";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  // API call to refresh token
  refreshToken(refreshToken: string): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.apiUrl}/refresh-token`,
      { refreshToken }
    ).pipe(
      tap((tokens) => {
        this.tokenService.setAccessToken(tokens.accessToken);
        this.tokenService.setRefreshToken(tokens.refreshToken);
      })
    );
  }

  // Login and save tokens
  login(credentials: { credential: string; password: string; remember: boolean }) {
    return this.http.post<{ accessToken: string; refreshToken: string }>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(
      tap((tokens) => {
        this.tokenService.setAccessToken(tokens.accessToken);
        this.tokenService.setRefreshToken(tokens.refreshToken);
      })
    );
  }

  // Logout and clear tokens
  logout() {
    this.tokenService.clearAccessToken();
    this.tokenService.clearRefreshToken();
  }
}
