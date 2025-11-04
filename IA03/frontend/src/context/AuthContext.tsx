import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { loginUser, logoutUser } from '../services/api';
import type { LoginData, TokensResponse } from '../services/api';
import { tokenStorage } from '../utils/tokenStorage';
import { setAccessToken, getAccessToken } from '../services/axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  isLoggingIn: boolean;
  loginError: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Check if user has a refresh token on mount
  useEffect(() => {
    const refreshToken = tokenStorage.getRefreshToken();
    const accessToken = getAccessToken();
    if (refreshToken || accessToken) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: TokensResponse) => {
      // Store tokens
      setAccessToken(data.accessToken);
      tokenStorage.setRefreshToken(data.refreshToken);
      setIsAuthenticated(true);

      // Navigate to dashboard
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      console.error('Login failed:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      handleLogoutSuccess();
    },
    onError: () => {
      // Even if logout API fails, clear local tokens
      handleLogoutSuccess();
    },
  });

  const handleLogoutSuccess = () => {
    // Clear tokens
    setAccessToken(null);
    tokenStorage.clearTokens();
    setIsAuthenticated(false);

    // Invalidate all queries
    queryClient.clear();

    // Navigate to login
    navigate('/login');
  };

  const login = async (data: LoginData) => {
    await loginMutation.mutateAsync(data);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
      }}
    >
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
