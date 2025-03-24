import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

const Login = ({ navigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

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
      <header className="header">
        <div className="logo">
          <span role="img" aria-label="blog icon">🌶️</span> Tempero Compartilhado
        </div>
      </header>

      <main className="main-content">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Login</h2>
          
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

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-button">
            Entrar
          </button>

          <p className="register-link">
            Não tem uma conta?{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cadastro'); }}>
              Cadastre-se
            </a>
          </p>
        </form>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Tempero Compartilhado. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Login; 