import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  changePassword: async () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('krivexa_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('krivexa_token') || null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync token to apiService client
  useEffect(() => {
    if (token) {
      localStorage.setItem('krivexa_token', token);
    } else {
      localStorage.removeItem('krivexa_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('krivexa_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('krivexa_user');
    }
  }, [user]);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await apiService.login(credentials);
      if (response.success) {
        setUser(response.data.user);
        setToken(response.data.token);
        return { success: true, user: response.data.user };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      const response = await apiService.post('/auth/register', userData);
      if (response.data && response.data.success) {
        const { token: newToken, user: newUser } = response.data.data;
        setUser(newUser);
        setToken(newToken);
        return { success: true, user: newUser };
      }
      return { success: false, message: response.data?.message || 'Registration failed' };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message || 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    setIsLoading(true);
    try {
      const response = await apiService.put('/users/profile', profileData);
      if (response.data && response.data.success) {
        setUser(response.data.data);
        return { success: true, user: response.data.data };
      }
      return { success: false, message: response.data?.message || 'Profile update failed' };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message || 'Profile update failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (passwords) => {
    setIsLoading(true);
    try {
      const response = await apiService.post('/users/change-password', passwords);
      if (response.data && response.data.success) {
        return { success: true, message: response.data.message };
      }
      return { success: false, message: response.data?.message || 'Password change failed' };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || err.message || 'Password change failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('krivexa_token');
    localStorage.removeItem('krivexa_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
