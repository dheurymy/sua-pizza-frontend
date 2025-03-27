import React, { useState } from 'react';
import { useAuth } from '../context/authContext';

import { Link} from 'react-router-dom'; // Importa componentes de roteamento

import '../assets/login-cliente.css';

const LoginCliente = () => {
    
    const [email, setEmail] = useState('');
    
    const [senha, setSenha] = useState('');
    
  
    const {login } = useAuth();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      const sucesso = await login(email, senha);
      if (sucesso) {
        console.log('Usuário autenticado com sucesso!');
      }
    };
  
  return (
    <div className='login'>
      <h1>Faça login no Sua Pizza</h1>
      <p>Preencha o formulário abaixo para fazer login no Sua Pizza. Isso deixará seus pedidos muito mais fáceis.</p>
      <form onSubmit={handleLogin}>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        
        <button type="submit"><Link to="/">Acessar</Link></button>
      </form>
      <p className='entrar'>Não tem uma conta? <Link to="/clientes/registro"><button>Cadastrar</button></Link></p> {/* Link para a página de login */}

      
    </div>
  )
}

export default LoginCliente; // Exporta o componente LoginCliente
