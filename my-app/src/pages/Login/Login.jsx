import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

const Login = ({ navigate }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    senha: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSucesso, setLoginSucesso] = useState(false);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Limpar erros quando o usuário digita
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    }
    
    if (!formData.senha) {
      errors.senha = "Senha é obrigatória";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      try {
        const usuario = await login(formData.email.trim(), formData.senha);
        setUsuarioLogado(usuario);
        setLoginSucesso(true);
        
        // Limpar formulário
        setFormData({
          email: "",
          senha: ""
        });
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        
        // Exibir mensagem de erro
        setFormErrors({ 
          submit: error.message || "Ocorreu um erro ao fazer login. Tente novamente." 
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Exibir tela de boas-vindas após login bem-sucedido
  if (loginSucesso && usuarioLogado) {
    return (
      <div className="auth-wrapper">
        <div className="container success-container">
          <div className="success-icon">✓</div>
          <h2>Login Realizado com Sucesso!</h2>
          <p>Bem-vindo de volta, {usuarioLogado.nome.split(' ')[0]}!</p>
          <p className="user-info">Você está pronto para compartilhar suas histórias e explorar nosso blog.</p>
          
          <div className="success-buttons">
            <button 
              onClick={() => navigate('/')}
              className="primary-button"
            >
              Ir para o Blog
            </button>
            <button 
              onClick={() => {
                setLoginSucesso(false);
              }} 
              className="secondary-button"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="blog-icon">
          <span role="img" aria-label="blog icon">✍️</span>
        </div>
        <h2>Entrar no Blog</h2>
        
        {formErrors.submit && (
          <div className="error-message">{formErrors.submit}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu.email@exemplo.com"
            />
            {formErrors.email && <div className="input-error">{formErrors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Digite sua senha"
            />
            {formErrors.senha && <div className="input-error">{formErrors.senha}</div>}
          </div>

          <div className="forgot-password">
            <a href="#">Esqueceu sua senha?</a>
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
        
        <div className="signup-link">
          Ainda não tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/cadastro'); }}>Cadastre-se</a>
        </div>
      </div>
    </div>
  );
};

export default Login; 