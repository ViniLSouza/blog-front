import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/authService';

// Criando o contexto
export const AuthContext = createContext(null);

// Hook para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Verificar se o usuário está logado ao carregar a aplicação
  useEffect(() => {
    const loadUser = () => {
      const savedUser = authService.getUsuario();
      if (savedUser) {
        setUser(savedUser);
      }
      setLoading(false);
    };
    loadUser();
  }, []);
  
  // Função para realizar login
  const login = async (email, senha) => {
    try {
      const usuario = await authService.login(email, senha);
      setUser(usuario);
      return usuario;
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };
  
  // Função para realizar cadastro
  const cadastrar = async (userData) => {
    try {
      const data = await authService.cadastrar(userData);
      return data;
    } catch (error) {
      console.error("Erro no cadastro:", error);
      throw error;
    }
  };
  
  // Função para fazer logout
  const logout = () => {
    authService.logout();
    setUser(null);
  };
  
  // Verificar se o usuário está autenticado
  const isAuthenticated = () => {
    return !!user;
  };
  
  // Valor do contexto
  const contextValue = {
    user,
    loading,
    login,
    cadastrar,
    logout,
    isAuthenticated
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}; 