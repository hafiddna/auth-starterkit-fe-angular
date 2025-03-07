import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { BaseResponse } from "../interfaces/base-response";
import { UserProfile } from "../interfaces/user-profile";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private accessToken: string | null = null;
  private dbName = 'authDB';
  private storeName = 'tokens';
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.initDB();
  }

  // Initialize IndexedDB
  private async initDB() {
    await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('tokens');
      },
    });
  }

  /** ACCESS TOKEN METHODS (Stored in Memory) **/
  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken() {
    this.accessToken = null;
  }

  /** REFRESH TOKEN METHODS (Stored in IndexedDB) **/
  async setRefreshToken(token: string) {
    const db = await openDB(this.dbName, 1);
    await db.put(this.storeName, token, 'refresh_token');
  }

  async getRefreshToken(): Promise<string | null> {
    const db = await openDB(this.dbName, 1);
    return (await db.get(this.storeName, 'refresh_token')) || null;
  }

  async clearRefreshToken() {
    const db = await openDB(this.dbName, 1);
    await db.delete(this.storeName, 'refresh_token');
  }

  getProfile(): Observable<BaseResponse<UserProfile>> {
    // TODO: Decrypt data on production
    return this.http.get<BaseResponse<UserProfile>>(`${this.apiUrl}/profile`)
  }
}
