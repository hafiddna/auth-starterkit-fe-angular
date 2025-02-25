export interface UserProfile {
  username: string;
  email: string;
  email_verified_at: number;
  phone: string;
  phone_verified_at: number;
  full_name: string;
  nick_name: string;
  avatar: string;
  role: string;
  teams?: any;
}
