import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify'; // Importa o toast
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../assets/cadastro-cliente.css';

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefones, setTelefones] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      toast.error('As senhas não correspondem.', { position: 'top-right', autoClose: 3000 });
      return;
    }

    const sucesso = await register(nome, email, telefones, senha);
    if (sucesso) {
      toast.success('Usuário registrado com sucesso!', { position: 'top-right', autoClose: 3000 });
      navigate('/clientes/endereco'); // Navega para a página de cadastro de endereço
    } else {
      toast.error('Erro ao registrar usuário.', { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <div className="cadastro-cliente">
      <h1>Crie seu perfil no Sua Pizza</h1>
      <p>Preencha o formulário abaixo para criar seu perfil no Sua Pizza. Isso deixará seus pedidos muito mais fáceis.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefones}
          onChange={(e) => setTelefones(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          autoComplete="new-password"

        />
        <input
          type="password"
          placeholder="Confirme a senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
          autoComplete="new-password"

        />
        <button type="submit">Cadastrar</button>
      </form>
      <p className='entrar'>Já tem uma conta? <Link to="/clientes/login"><button>Acessar</button></Link></p> {/* Link para a página de login */}
    </div>
  );
};

export default CadastroCliente; // Exporta o componente CadastroCliente