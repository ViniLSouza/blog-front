import { useState } from "react"; 
import { useAuth } from "../../contexts/AuthContext";
import { validateCadastroForm } from "../../utils/validation";
import { formatTelefone } from "../../utils/formatters";
import { VALIDATION } from "../../utils/constants";
import "./Cadastro.css";

const Cadastro = ({ navigate }) => {
  const { cadastrar } = useAuth();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    bio: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cadastroSucesso, setCadastroSucesso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Aplica formatação específica para o telefone
    if (name === 'telefone') {
      const formattedTelefone = formatTelefone(value);
      setFormData({ ...formData, [name]: formattedTelefone });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Limpar erros quando o usuário digita
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateCadastroForm(formData);
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      try {
        // Dados a serem enviados para a API
        const dadosParaEnvio = {
          nome: formData.nome.trim(),
          email: formData.email.trim(),
          telefone: formData.telefone,
          senha: formData.senha,
          bio: formData.bio.trim() || ""
        };

        // Usa o serviço de autenticação para cadastrar o usuário
        await cadastrar(dadosParaEnvio);
        
        // Atualiza o estado para mostrar a mensagem de sucesso
        setCadastroSucesso(true);
        setFormData({
          nome: "",
          email: "",
          telefone: "",
          senha: "",
          confirmarSenha: "",
          bio: ""
        });
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        
        // Tratamento de erros específicos
        if (error.message === "Email já cadastrado") {
          setFormErrors({ email: "Este email já está cadastrado" });
        } else {
          setFormErrors({ 
            submit: error.message || "Ocorreu um erro ao cadastrar. Tente novamente." 
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (cadastroSucesso) {
    return (
      <div className="auth-wrapper">
        <div className="container success-container">
          <div className="success-icon">✓</div>
          <h2>Cadastro Realizado com Sucesso!</h2>
          <p>Bem-vindo ao Blog Criativo! Sua conta foi criada e você já pode fazer login para começar a compartilhar suas histórias.</p>
          <div className="success-buttons">
            <button 
              onClick={() => navigate('/login')}
              className="primary-button"
            >
              Fazer Login
            </button>
            <button 
              onClick={() => setCadastroSucesso(false)} 
              className="secondary-button"
            >
              Voltar ao Cadastro
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
        <h2>Junte-se ao Blog</h2>
        
        {formErrors.submit && (
          <div className="error-message">{formErrors.submit}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              maxLength={VALIDATION.MAX_NOME_LENGTH}
            />
            <div className="input-counter">
              {formData.nome.length}/{VALIDATION.MAX_NOME_LENGTH}
            </div>
            {formErrors.nome && <div className="input-error">{formErrors.nome}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu.email@exemplo.com"
              maxLength={VALIDATION.MAX_EMAIL_LENGTH}
            />
            {formErrors.email && <div className="input-error">{formErrors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(XX) XXXXX-XXXX"
              maxLength={VALIDATION.MAX_TELEFONE_LENGTH}
            />
            {formErrors.telefone && <div className="input-error">{formErrors.telefone}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="bio">Sobre Você</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Conte um pouco sobre você, suas experiências e interesses no mundo da escrita..."
              rows="4"
              maxLength={VALIDATION.MAX_BIO_LENGTH}
            />
            <div className="bio-counter">
              {formData.bio.length}/{VALIDATION.MAX_BIO_LENGTH} caracteres
            </div>
            {formErrors.bio && <div className="input-error">{formErrors.bio}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Mínimo de 6 caracteres"
              maxLength={VALIDATION.MAX_SENHA_LENGTH}
            />
            <div className="password-requirements">
              <p>A senha deve conter:</p>
              <ul>
                <li className={formData.senha.length >= VALIDATION.MIN_SENHA_LENGTH ? 'fulfilled' : ''}>
                  Pelo menos {VALIDATION.MIN_SENHA_LENGTH} caracteres
                </li>
                <li className={/[A-Z]/.test(formData.senha) ? 'fulfilled' : ''}>
                  Uma letra maiúscula
                </li>
                <li className={/[a-z]/.test(formData.senha) ? 'fulfilled' : ''}>
                  Uma letra minúscula
                </li>
                <li className={/[0-9]/.test(formData.senha) ? 'fulfilled' : ''}>
                  Um número
                </li>
                <li className={/[@$!%*?&]/.test(formData.senha) ? 'fulfilled' : ''}>
                  Um caractere especial (@$!%*?&)
                </li>
              </ul>
            </div>
            {formErrors.senha && <div className="input-error">{formErrors.senha}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Digite sua senha novamente"
              maxLength={VALIDATION.MAX_SENHA_LENGTH}
            />
            {formErrors.confirmarSenha && <div className="input-error">{formErrors.confirmarSenha}</div>}
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Começar a Blogar"}
          </button>
        </form>
        
        <div className="login-link">
          Já tem uma conta? <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>Faça login</a>
        </div>
      </div>
    </div>
  );
};

export default Cadastro; 