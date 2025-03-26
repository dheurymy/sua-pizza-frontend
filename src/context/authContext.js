import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-toastify'; // Importa o React-Toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa o estilo

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
        toast.success('Usuário registrado com sucesso!', {
          position: 'top-right',
          autoClose: 3000,
        });
        return true;
      } else {
        toast.error(data.message || 'Erro ao registrar.', {
          position: 'top-right',
          autoClose: 3000,
        });
        return false;
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      toast.error('Erro no servidor. Tente novamente mais tarde.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return false;
    }
  };

  const login = () => {

  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    toast.info('Logout realizado com sucesso.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);