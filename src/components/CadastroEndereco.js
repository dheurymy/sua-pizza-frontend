import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify'; // Importa o toast
import { Link} from 'react-router-dom'; // Importa componentes de roteamento


import '../assets/cadastro-endereco.css';

const CadastroEndereco = () => {
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
 

  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    
  };

  return (
    <div className="cadastro-endereco">
      <h1>Adicione seu endereço no Sua Pizza</h1>
      <p>Preencha o formulário abaixo para adicionar seu endereço no Sua Pizza. Isso deixará seus pedidos muito mais fáceis.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Logradouro"
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
        />
        <div>
          <input
            type="text"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
          <input
            type="text"
            placeholder="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Complemento"
          value={complemento}
          onChange={(e) => setComplemento(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <div>
          <input
            type="text"
            placeholder="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
        </div>
        <button type="submit"><Link to="clientes/endereco">Cadastrar</Link></button>
      </form>
      <p className='entrar'>Já tem uma conta? <Link to="/clientes/login"><button>Acessar</button></Link></p> {/* Link para a página de login */}
    </div>
  );
};

export default CadastroEndereco; // Exporta o componente Cadastroendereco