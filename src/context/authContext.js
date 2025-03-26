import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (nome, email, telefones, senha) => {
    try {
      const response = await fetch('https://sua-pizza-backend.vercel.app/clientes/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, email, telefones, senha }),
      });
      const data = await response.json();

      if (response.ok) {
        setUser({ nome, email });
        return true;
      } else {
        alert(data.message);
        return false;
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);