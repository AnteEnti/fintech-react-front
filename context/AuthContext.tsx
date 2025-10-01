import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types';
import * as userService from '../services/userService';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  // FIX: Changed login return type from void to boolean to match implementation and fix type error in AuthModal.
  login: (username: string) => boolean;
  signup: (username: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for logged-in user on initial load
    const currentUser = userService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = (username: string): boolean => {
    const success = userService.login(username);
    if (success) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const signup = (username: string): boolean => {
    const success = userService.signup(username);
    if (success) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const logout = () => {
    userService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, signup, logout }}>
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