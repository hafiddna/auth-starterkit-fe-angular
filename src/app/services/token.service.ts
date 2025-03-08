import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import * as CryptoJS from 'crypto-js';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { BaseResponse } from "../interfaces/base-response";
import { UserProfile } from "../interfaces/user-profile";

export interface EncryptedData {
  iv: string;      // Base64 encoded IV
  value: string;   // Base64 encoded encrypted data
  mac: string;     // HMAC hash for verification
  tag?: string;     // AEAD tag for verification
}

export interface JWTEncryptedData extends JwtPayload {
  data: EncryptedData;
}

export interface JWTTeamSub {
  sub: string;
  roles: string[];
  permissions: string[];
}

export interface JWTUser {
  team_sub: JWTTeamSub[];
  roles: string[];
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private accessToken: string | null = null;
  private dbName = 'authDB';
  private storeName = 'tokens';
  private apiUrl = environment.apiUrl;
  private authDataKey = environment.authDataKey;

  constructor(private http: HttpClient) {
    this.initDB().then(() => {});
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

  decrypt(encryptedData: EncryptedData, key: string): string | null {
    try {
      // Base64 decode IV and ciphertext
      const iv = CryptoJS.enc.Base64.parse(encryptedData.iv);
      const ciphertext = CryptoJS.enc.Base64.parse(encryptedData.value);

      // Compute HMAC and verify
      const computedMac = CryptoJS.HmacSHA256(
        CryptoJS.lib.WordArray.create([...iv.words, ...ciphertext.words]),
        CryptoJS.enc.Utf8.parse(key)
      ).toString(CryptoJS.enc.Hex);

      if (computedMac !== encryptedData.mac) {
        throw new Error('HMAC verification failed, data may be tampered with');
      }

      const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext });

      const decrypted = CryptoJS.AES.decrypt(
        cipherParams,  // ✅ Now it is a valid CipherParams object
        CryptoJS.enc.Utf8.parse(key),
        { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
      );

      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  }

  decodeToken(token: string): JWTUser | null {
    try {
      const decrypted = this.decrypt(jwtDecode<JWTEncryptedData>(token).data, this.authDataKey);

      if (!decrypted) {
        throw new Error('Decryption failed or returned null.');
      }

      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
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
