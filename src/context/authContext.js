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
        localStorage.setItem('id', data.cliente._id); // Armazena o id do cliente no localStorage
        return true;
        
      } else {
        toast.error(data.message || 'Erro ao registrar usuário.', { position: 'top-right', autoClose: 3000 });
        return false;
      }
    } catch (error) {
      console.error('Erro ao registrar:', error); // Loga erro no console
      toast.error('Erro na comunicação com o servidor.', { position: 'top-right', autoClose: 3000 });
      return false;
    }
  };

  const login = async (email, senha) => {
    try {
      const response = await fetch('https://sua-pizza-backend.vercel.app/clientes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });
      const data = await response.json();

      if (response.ok) {
        const { token, user } = data;
        localStorage.setItem('token', token); // Armazena o token no localStorage
        setUser(user); // Atualiza o estado com as informações do usuário
        toast.success('Login realizado com sucesso!', { position: 'top-right', autoClose: 3000 });
        return true;
      } else {
        toast.error(data.message || 'Erro ao realizar login.', { position: 'top-right', autoClose: 3000 });
        return false;
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error); // Loga erro no console
      toast.error('Erro na comunicação com o servidor.', { position: 'top-right', autoClose: 3000 });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    toast.info('Logout realizado com sucesso.', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  const registroEndereco = async (userId, logradouro, numero, complemento, bairro, cidade, estado, cep) => {
    try {
      const response = await fetch('https://sua-pizza-backend.vercel.app/enderecos/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, logradouro, numero, complemento, bairro, cidade, estado, cep }),
      });
      const data = await response.json();

      if (response.ok) {
        
        return true;
        
      } else {
        toast.error(data.message || 'Erro ao registrar endereço.', { position: 'top-right', autoClose: 3000 });
        return false;
      }
    } catch (error) {
      console.error('Erro ao registrar:', error); // Loga erro no console
      toast.error('Erro na comunicação com o servidor.', { position: 'top-right', autoClose: 3000 });
      return false;
    }
  };


  return (
    <AuthContext.Provider value={{ user, login, register, logout, registroEndereco }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);