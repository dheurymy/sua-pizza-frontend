import React from 'react'; // Importa a biblioteca React
import { AuthProvider } from './context/authContext'; // Importa o contexto de autenticação
import Cadastro from './components/Cadastro'; // Importa o componente Cadastro

import { ToastContainer } from 'react-toastify';

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'; // Importa componentes para criação de rotas


function App() {
  return (
    <AuthProvider> {/* Provedor de autenticação */}
     <Router> {/* Componente de roteamento principal */}
      <div className="App">
      <ToastContainer /> {/* Contêiner para exibir as notificações */}

      <Routes> {/* Define as rotas */}
            
            
            <Route path="/clientes/registro" element={<Cadastro />} /> {/* Rota para o componente Register */}
           
      </Routes>

        
      </div>
      </Router>
    </AuthProvider> 
  );
}

export default App;