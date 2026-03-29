export interface AuthUser {
  id: number;
  username: string;
  role: 'admin' | 'user';
}

export interface LoginResponse {
  access_token: string;
  user: AuthUser;
}