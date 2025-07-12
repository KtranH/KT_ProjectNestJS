export interface JwtPayload {
  username: string;
  sub: number;
  userId: number;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    username: string;
  };
}

export interface UserProfile {
  id: number;
  username: string;
  createdAt?: Date;
  updatedAt?: Date;
}
