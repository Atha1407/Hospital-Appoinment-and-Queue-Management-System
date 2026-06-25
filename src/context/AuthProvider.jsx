import React, { useState } from 'react';
import { AuthContext } from './AuthContext.jsx';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      return null;
    }
  });

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('auth_user', JSON.stringify(userData));
    } catch (e) {
      console.error('Failed to store auth user in localStorage', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('auth_user');
    } catch (e) {
      console.error('Failed to remove auth user from localStorage', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
