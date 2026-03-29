import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface AuthContextType {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<any | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser && savedUser !== "undefined" ? JSON.parse(savedUser) : null;
  });

  // DETERMINACIÓN REAL: No depende de estados asíncronos
  const isAuthenticated = !!token && token !== "undefined" && !!localStorage.getItem('token');

  const login = (userData: any, userToken: string) => {
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(userToken);
    setUser(userData);
  };

  const logout = useCallback(() => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    // Hard redirect para limpiar memoria de React y detener bucles
    window.location.href = '/auth/login';
  }, []);

  // Escuchar cambios en otras pestañas o desde el service
  useEffect(() => {
    const syncLogout = (e: StorageEvent) => {
      if (e.key === 'token' && !e.newValue) {
        setToken(null);
        setUser(null);
      }
    };
    window.addEventListener('storage', syncLogout);
    return () => window.removeEventListener('storage', syncLogout);
  }, []);

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