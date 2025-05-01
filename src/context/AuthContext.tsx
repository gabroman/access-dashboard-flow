
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { AuthState, DecodedToken, LoginCredentials, User, UserRole } from '@/types/auth';
import { sampleUsers } from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const TOKEN_NAME = 'auth_token';
const JWT_SECRET = 'your-temporary-secret-key';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const navigate = useNavigate();

  // Initialize auth state from token
  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get(TOKEN_NAME);
      
      if (token) {
        try {
          const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
          const user: User = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            role: decoded.role,
          };
          
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Invalid token:', error);
          Cookies.remove(TOKEN_NAME);
          setState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } else {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    // Simulate API call with sample users
    const user = sampleUsers.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      // Create token
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        JWT_SECRET,
        { expiresIn: '1d' }
      );

      // Save token to cookie
      Cookies.set(TOKEN_NAME, token, { 
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        // httpOnly: true // Note: Can't set HttpOnly from client side JS
      });

      // Update state
      setState({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        isAuthenticated: true,
        isLoading: false,
      });

      // Redirect to role-specific dashboard
      navigate(`/dashboard/${user.role}`);
      return true;
    }

    return false;
  };

  // Logout function
  const logout = () => {
    Cookies.remove(TOKEN_NAME);
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    navigate('/login');
  };

  // Set user function (for testing)
  const setUser = (user: User | null) => {
    setState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
