import React from 'react'; // Importa a biblioteca React
import { AuthProvider } from './context/authContext'; // Importa o contexto de autenticação
import 'react-toastify/dist/ReactToastify.css'; // Importa o CSS do Toastify

import CadastroCliente from './components/CadastroCliente'; // Importa o componente CadastroCliente
import CadastroEndereco from './components/CadastroEndereco'; // Importa o componente CadastroEndereco
import LoginCliente from './components/LoginCliente'; // Importa o componente LoginCliente


import { ToastContainer } from 'react-toastify';

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; // Importa componentes para criação de rotas


function App() {
  return (
    <AuthProvider> {/* Provedor de autenticação */}
     <Router> {/* Componente de roteamento principal */}
      <div className="App">
      <ToastContainer /> {/* Contêiner para exibir as notificações */}

      <Routes> {/* Define as rotas */}
            
            
            <Route path="/clientes/registro" element={<CadastroCliente />} /> {/* Rota para o componente CadastroCliente */}
            <Route path="/clientes/login" element={<LoginCliente />} /> {/* Rota para o componente LoginCliente */}
            <Route path="/clientes/endereco" element={<CadastroEndereco />} /> {/* Rota para o componente CadastroEndereco */}
           
      </Routes>

        
      </div>
      </Router>
    </AuthProvider> 
  );
}

export default App;