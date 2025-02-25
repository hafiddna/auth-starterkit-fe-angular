import { Injectable, signal } from '@angular/core';
import { UserProfile } from "../interfaces/user-profile";
import { TokenService } from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileSignal = signal<UserProfile | null>(null);

  constructor(private tokenService: TokenService) {
    this.tokenService.getProfile().subscribe((res) => {
      this.profileSignal.set(res.data);
    });
  }

  getProfileSignal() {
    return this.profileSignal;
  }
}
