export interface JwtPayload {
  sub: number;
  username: string;
  role: 'admin' | 'user';
}