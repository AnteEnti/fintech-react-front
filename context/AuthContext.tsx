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

  const fetchUserDetails = async (token: string) => {
    const userDetailsResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/users/me?context=edit`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!userDetailsResponse.ok) {
      throw new Error("Failed to fetch user details.");
    }

    const userData = await userDetailsResponse.json();
    setUser({ username: userData.name, roles: userData.roles || [] });
    setIsAuthenticated(true);
    setToken(token);
  };

  useEffect(() => {
    const validateTokenAndFetchUser = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        try {
          const validationResponse = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token/validate`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${storedToken}`
            }
          });

          if (validationResponse.ok) {
            // Token is valid, now fetch the full user details
            await fetchUserDetails(storedToken);
          } else {
            logout(); // Token is invalid or expired
          }
        } catch (error) {
          console.error("Token validation or user fetch error:", error);
          logout();
        }
      }
    };
    validateTokenAndFetchUser();
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
        const newToken = data.token;
        localStorage.setItem('authToken', newToken);
        await fetchUserDetails(newToken); // Fetch user details with the new token
        return { success: true, message: 'Login successful!' };
      } else {
        const errorMessage = data.message || (data.data && data.data.message) || 'Login failed.';
        return { success: false, message: errorMessage.replace(/<[^>]*>?/gm, '') };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: 'A network error occurred.' };
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
