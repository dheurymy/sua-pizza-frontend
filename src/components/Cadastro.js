import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify'; // Importa o toast
import { Link} from 'react-router-dom'; // Importa componentes de roteamento

import 'react-toastify/dist/ReactToastify.css'; // Importa o CSS do Toastify
import '../assets/cadastro.css';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefones, setTelefones] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      toast.error('As senhas não correspondem.', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const sucesso = await register(nome, email, telefones, senha);
    if (sucesso) {
      toast.success('Usuário registrado com sucesso!', { position: 'top-right', autoClose: 3000 });
    } else {
      toast.error('Erro ao registrar usuário.', { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <div className="cadastro">
      <h1>Crie seu perfil no Sua Pizza</h1>
      <p>Preencha o formulário abaixo para criar seu perfil no Sua Pizza. Isso deixará seus pedidos muito mais fáceis.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefones}
          onChange={(e) => setTelefones(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </form>
      <p className='entrar'>Já tem uma conta? <Link to="/clientes/login"><button>Acessar</button></Link></p> {/* Link para a página de login */}
    </div>
  );
};

export default Cadastro;