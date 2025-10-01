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
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          // Validate the token against the server to ensure it's not expired or invalid
          const validationResponse = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token/validate`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (validationResponse.ok) {
            // Token is valid, now get user data
            const userResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/users/me`, {
                headers: {
                    'Authorization': `Bearer ${storedToken}`
                }
            });

            if(userResponse.ok) {
                const userData = await userResponse.json();
                setUser({ username: userData.name });
                setIsAuthenticated(true);
                setToken(storedToken);
            } else {
                 logout();
            }
          } else {
            logout();
          }
        } catch (error) {
          console.error("Token validation error:", error);
          logout();
        }
      }
    };
    validateToken();
  }, []);

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
        const errorMessage = data.message || (data.data && data.data.message) || 'Login failed.';
        return { success: false, message: errorMessage.replace(/<[^>]*>?/gm, '') };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: 'An network error occurred.' };
    }
  };

  const signup = async (username: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
     try {
      const response = await fetch(`${WORDPRESS_URL}/wp-json/custom/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
      });
      
      const data = await response.json();

      if (response.ok || response.status === 201) {
         return await login(username, password);
      } else {
        const errorMessage = data.message || (data.data && data.data.message) || 'Signup failed.';
        return { success: false, message: errorMessage.replace(/<[^>]*>?/gm, '') };
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