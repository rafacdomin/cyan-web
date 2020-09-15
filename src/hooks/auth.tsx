import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../services/api';

interface AuthContextData {
  user: object | null;
  Login(userData: Request): Promise<void>;
  Logout(): void;
}

interface Request {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(() => {
    const storagedUser = sessionStorage.getItem('@Cyan:user');
    const storagedToken = sessionStorage.getItem('@Cyan:token');

    if (storagedUser && storagedToken) {
      api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
      return JSON.parse(storagedUser);
    }

    return null;
  });

  const Login = useCallback(async ({ email, password }: Request) => {
    const { data } = await api.post('/sessions', {
      email,
      password,
    });

    setUser(data.user);
    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    sessionStorage.setItem('@Cyan:user', JSON.stringify(data.user));
    sessionStorage.setItem('@Cyan:token', data.token);
  }, []);

  const Logout = useCallback(() => {
    setUser(null);
    api.defaults.headers.Authorization = '';

    sessionStorage.removeItem('@Cyan:user');
    sessionStorage.removeItem('@Cyan:token');
  }, []);

  return (
    <AuthContext.Provider value={{ user: user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
