import { User } from '../entities';

export interface LoginCredentials {
  phone: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  phone: string;
  email?: string;
  password?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<AuthResponse>;
  register(data: RegisterData): Promise<AuthResponse>;
  verifyPhone(phone: string, code: string): Promise<boolean>;
  sendOTP(phone: string): Promise<void>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<string>;
  getCurrentUser(): Promise<User | null>;
}

