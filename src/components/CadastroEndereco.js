import React, { useState } from 'react';
import { useAuth } from '../context/authContext';
import { toast } from 'react-toastify'; // Importa o toast
import { Link } from 'react-router-dom'; // Importa useNavigate

import '../assets/cadastro-endereco.css';

const CadastroEndereco = () => {
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cep, setCep] = useState('');
  const userId = localStorage.getItem('id'); // Obtém o id do usuário logado

  const { registroEndereco } = useAuth();

  // Função para formatar o CEP
  const formatCep = (cep) => {
    return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
  };

  // Função para buscar endereço usando API ViaCEP
  const fetchAddress = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        toast.error("CEP inválido. Tente novamente.");
        return;
      }
      setLogradouro(data.logradouro || '');
      setBairro(data.bairro || '');
      setCidade(data.localidade || '');
      setEstado(data.uf || '');
    } catch (error) {
      toast.error("Erro ao buscar o endereço. Verifique sua conexão.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sucesso = await registroEndereco(userId, logradouro, numero, complemento, bairro, cidade, estado, cep);
        if (sucesso) {
          toast.success('Endereço registrado com sucesso!', { position: 'top-right', autoClose: 3000 });
          
        } else {
          toast.error('Erro ao registrar endereço.', { position: 'top-right', autoClose: 3000 });
        }
    
  };

  return (
    <div className="cadastro-endereco">
      <h1>Endereço de Entrega - Sua Pizza</h1>
      <p>Preencha o formulário abaixo para adicionar seu endereço de entrega no Sua Pizza. Isso deixará seus pedidos muito mais fáceis.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Logradouro"
          value={logradouro}
          onChange={(e) => setLogradouro(e.target.value)}
          required
        />
        <div className='input-grupo'>
          <input
            type="text"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Bairro"
            value={bairro}
            onChange={(e) => setBairro(e.target.value)}
            required
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
          required
        />
        <div className='input-grupo'>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
          >
            <option value="">Estado</option>
            <option value="AC">Acre</option> 
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>

          <input
            type="text"
            placeholder="CEP"
            value={cep}
            onChange={(e) => setCep(formatCep(e.target.value.replace(/\D/g, '')))}
            onBlur={() => fetchAddress(cep.replace(/\D/g, ''))}
            required
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p className='entrar'>Já tem uma conta? <Link to="/clientes/login"><button>Acessar</button></Link></p>
    </div>
  );
};

export default CadastroEndereco; // Exporta o componente CadastroEndereco