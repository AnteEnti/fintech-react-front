import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const WORDPRESS_URL = 'https://wp.amadeinandhra.com';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          // First, check if the token is structurally a JWT
          const payloadData = token.split('.')[1];
          if (!payloadData) {
              logout();
              return;
          }
          
          // Second, send to the server to validate the signature and expiry
          const response = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token/validate`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            // If the server confirms the token is valid, we can trust its contents.
            // Decode the payload to get user information without another network request.
            const payload = JSON.parse(atob(payloadData));
            
            // The payload structure from "JWT Authentication for WP REST API" can vary.
            // Let's try to find the display name in a few common locations.
            const displayName = payload?.data?.user?.display_name   // Standard plugin structure
                              || payload?.user_display_name           // Matches login API response
                              || payload?.name;                       // Standard JWT 'name' claim

            if (displayName) {
                setUser({ username: displayName });
                setIsAuthenticated(true);
            } else {
                console.error("Validated token has an unexpected payload structure. Payload:", payload);
                logout();
            }
          } else {
            // Server says token is invalid (expired, wrong signature, etc.)
            logout();
          }
        } catch (error) {
          console.error("Token validation error:", error);
          logout();
        }
      }
    };
    validateToken();
  }, [token]);

  const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setUser({ username: data.user_display_name });
        setIsAuthenticated(true);
        return { success: true, message: 'Login successful!' };
      } else {
        // WordPress might return error messages in different structures.
        const errorMessage = data.message || (data.data && data.data.message) || 'Login failed.';
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: 'An network error occurred.' };
    }
  };

  const signup = async (username: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
     try {
      // Use the new custom registration endpoint
      const response = await fetch(`${WORDPRESS_URL}/wp-json/custom/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json();

      if (response.ok || response.status === 201) {
         // After successful registration, automatically log the user in
         return await login(username, password);
      } else {
        const errorMessage = data.message || (data.data && data.data.message) || 'Signup failed.';
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: 'A network error occurred.' };
    }
  };


  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
