import React from 'react'; // Importa a biblioteca React
import { AuthProvider } from './context/authContext'; // Importa o contexto de autenticação
import Cadastro from './components/Cadastro'; // Importa o componente Cadastro

function App() {
  return (
    <AuthProvider> {/* Provedor de autenticação */}
      <div className="App">
        <Cadastro />
      </div>
    </AuthProvider> 
  );
}

export default App;