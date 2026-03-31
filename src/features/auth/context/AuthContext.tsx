import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidStoredToken } from '../utils/token';
import { disconnectSocket } from '@/services/socket';
import { getTokenExpirySeconds } from '../utils/token';

interface AuthUser {
  idUser: number;
  nombreUsuario: string;
  correo?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: AuthUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = isValidStoredToken(token);

  const login = (userData: AuthUser, userToken: string) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    try {
      disconnectSocket();
    } catch (e) {}
    navigate('/auth/login', { replace: true });
  }, [navigate]);

  const expiryTimerRef = useRef<number | null>(null);

  // Schedule auto-logout when token expires
  useEffect(() => {
    if (expiryTimerRef.current) {
      window.clearTimeout(expiryTimerRef.current);
      expiryTimerRef.current = null;
    }

    const expirySec = getTokenExpirySeconds(token);
    if (expirySec) {
      const msUntil = expirySec * 1000 - Date.now();
      if (msUntil <= 0) {
        // already expired
        logout();
      } else {
        expiryTimerRef.current = window.setTimeout(() => {
          // force logout when token expires
          logout();
        }, msUntil + 1000); // add small buffer
      }
    }

    return () => {
      if (expiryTimerRef.current) {
        window.clearTimeout(expiryTimerRef.current);
        expiryTimerRef.current = null;
      }
    };
  }, [token, logout]);

  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'token' && !event.newValue) {
        setToken(null);
        setUser(null);
      }
    };

    const onUnauthorized = () => {
      setToken(null);
      setUser(null);
      navigate('/auth/login', { replace: true });
    };

    window.addEventListener('storage', syncLogout);
    window.addEventListener('auth:unauthorized', onUnauthorized);

    return () => {
      window.removeEventListener('storage', syncLogout);
      window.removeEventListener('auth:unauthorized', onUnauthorized);
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return context;
};