import { useState } from "react";
import "./login.css";

// Usando o proxy configurado no vite.config.js
const API_URL = "/api";

const Login = ({ navigate }) => {
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
        const dadosParaEnvio = {
          email: formData.email.trim(),
          senha: formData.senha
        };

        const response = await fetch(`${API_URL}/usuarios/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        });

        const data = await response.json();
        
        if (response.ok) {
          // Login bem-sucedido, salvar token no localStorage
          localStorage.setItem("token", data.token);
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          
          setUsuarioLogado(data.usuario);
          setLoginSucesso(true);
          
          // Limpar formulário
          setFormData({
            email: "",
            senha: ""
          });
        } else {
          // Tratamento de erros específicos da API
          if (data.erro === "Credenciais inválidas") {
            setFormErrors({ 
              submit: "Email ou senha incorretos. Por favor, verifique suas credenciais." 
            });
          } else {
            setFormErrors({ 
              submit: data.erro || "Ocorreu um erro ao fazer login. Tente novamente." 
            });
          }
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        setFormErrors({ 
          submit: "Erro de conexão com o servidor. Verifique sua conexão e tente novamente." 
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Exibir tela de boas-vindas após login bem-sucedido
  if (loginSucesso && usuarioLogado) {
    return (
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
              localStorage.removeItem("token");
              localStorage.removeItem("usuario");
              setLoginSucesso(false);
            }} 
            className="secondary-button"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  return (
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
  );
};

export default Login; 