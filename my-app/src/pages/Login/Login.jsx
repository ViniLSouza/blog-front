/**
 * Página de login do blog
 * Permite que usuários existentes acessem suas contas
 */
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

/**
 * Componente Login
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.navigate - Função de navegação do React Router
 */
const Login = ({ navigate }) => {
  // Hook de autenticação
  const { login } = useAuth();

  // Estados do formulário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  /**
   * Manipula o envio do formulário de login
   * @param {Event} e - Evento de submit do formulário
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, senha);
      navigate('/');
    } catch (error) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      {/* Cabeçalho com logo */}
      <header className="header">
        <div className="logo">
          <span role="img" aria-label="blog icon">🌶️</span> Tempero Compartilhado
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="main-content">
        {/* Formulário de login */}
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Login</h2>
          
          {/* Campo de email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de senha */}
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {/* Mensagem de erro */}
          {error && <p className="error-message">{error}</p>}

          {/* Botão de submit */}
          <button type="submit" className="submit-button">
            Entrar
          </button>

          {/* Link para cadastro */}
          <p className="register-link">
            Não tem uma conta?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cadastro'); }}>
              Cadastre-se
            </a>
          </p>
        </form>
      </main>

      {/* Rodapé */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Tempero Compartilhado. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Login; 