export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
  enabled: boolean;
  createdAt: string;
  lastLogin: string|null;
}
export interface LoginRequest  {
  email: string;
  password: string;
};

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
};

export interface AuthResponse{
    accessToken: string,
    refreshToken: string,
    type: 'Bearer',
    expiresIn: number,
    user: User
}
