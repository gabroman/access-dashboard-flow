
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { DecodedToken, User, UserRole } from '@/types/auth';

const TOKEN_NAME = 'auth_token';
const JWT_SECRET = 'your-temporary-secret-key'; // This will be replaced with env variable

// Function to generate a token (for demo purposes)
export function generateToken(user: { id: string; name: string; email: string; role: UserRole }): string {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
}

// Get token from cookie
export function getToken(): string | undefined {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  return token;
}

// Verify and decode the token
export function verifyToken(token: string): DecodedToken | null {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

// Extract user from token
export function getUserFromToken(token?: string): User | null {
  if (!token) return null;
  
  const decoded = verifyToken(token);
  if (!decoded) return null;
  
  return {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
    role: decoded.role
  };
}

// Check if token is expired
export function isTokenExpired(token: string): boolean {
  const decoded = verifyToken(token);
  if (!decoded) return true;
  
  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
}

// Get dashboard path based on user role
export function getDashboardPath(role: UserRole): string {
  return `/dashboard/${role}`;
}

// Sample users for demo (will be replaced with API later)
export const sampleUsers = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'password', role: 'admin' as UserRole },
  { id: '2', name: 'Doctor Smith', email: 'doctor@example.com', password: 'password', role: 'doctor' as UserRole },
  { id: '3', name: 'Reception Staff', email: 'receptionist@example.com', password: 'password', role: 'receptionist' as UserRole },
  { id: '4', name: 'Patient Doe', email: 'patient@example.com', password: 'password', role: 'patient' as UserRole }
];
