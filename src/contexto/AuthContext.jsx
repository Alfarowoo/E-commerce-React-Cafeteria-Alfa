import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token almacenado al cargar
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ username: 'admin' }); // Simular usuario autenticado
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Simular validación de credenciales
    if (username === 'admin' && password === '1234') {
      const token = 'token-simulado-' + Math.random();
      localStorage.setItem('authToken', token);
      setUser({ username });
      return { success: true };
    }
    return { success: false, error: 'Credenciales inválidas' };
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;