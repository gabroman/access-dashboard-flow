
export type UserRole = 'admin' | 'doctor' | 'receptionist' | 'patient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  imageUrl?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
