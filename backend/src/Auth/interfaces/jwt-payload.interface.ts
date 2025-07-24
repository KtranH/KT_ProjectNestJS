//===============================================
// Interface cho việc trả về payload của JWT
//===============================================
export interface JwtPayload {
  username: string;
  sub: number;
  userId: number;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

//===============================================
// Interface cho việc trả về response của auth
//===============================================
export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: {
    id: number;
    username: string;
    fullName?: string;
    email?: string;
  };
}

//===============================================
// Interface cho việc trả về profile của user
//===============================================
export interface UserProfile {
  id: number;
  username: string;
  fullName?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
