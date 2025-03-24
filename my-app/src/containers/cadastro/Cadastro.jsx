import { useState } from "react"; 
import "./cadastro.css";

// Usando o proxy configurado no vite.config.js
const API_URL = "/api";

// Constantes para validação
const MAX_NOME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 100;
const MAX_TELEFONE_LENGTH = 15;
const MIN_SENHA_LENGTH = 6;
const MAX_SENHA_LENGTH = 50;
const MAX_BIO_LENGTH = 500;

// Regex para validação
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const TELEFONE_REGEX = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
const SENHA_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

const Cadastro = ({ navigate }) => {
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

  // Formatar telefone enquanto o usuário digita
  const formatTelefone = (value) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, "");
    
    // Aplica a máscara conforme o usuário digita
    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : "";
    } else if (numbers.length <= 7) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
    } else {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7, 11)}`;
    }
  };

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

  const validateForm = () => {
    const errors = {};
    
    // Validação do Nome
    if (!formData.nome.trim()) {
      errors.nome = "Nome é obrigatório";
    } else if (formData.nome.length > MAX_NOME_LENGTH) {
      errors.nome = `Nome deve ter no máximo ${MAX_NOME_LENGTH} caracteres`;
    }
    
    // Validação do Email
    if (!formData.email.trim()) {
      errors.email = "Email é obrigatório";
    } else if (formData.email.length > MAX_EMAIL_LENGTH) {
      errors.email = `Email deve ter no máximo ${MAX_EMAIL_LENGTH} caracteres`;
    } else if (!EMAIL_REGEX.test(formData.email)) {
      errors.email = "Formato de email inválido";
    }
    
    // Validação do Telefone
    if (!formData.telefone.trim()) {
      errors.telefone = "Telefone é obrigatório";
    } else if (!TELEFONE_REGEX.test(formData.telefone)) {
      errors.telefone = "Formato deve ser (XX) XXXXX-XXXX";
    }
    
    // Validação da Bio
    if (formData.bio.length > MAX_BIO_LENGTH) {
      errors.bio = `A biografia deve ter no máximo ${MAX_BIO_LENGTH} caracteres`;
    }
    
    // Validação da Senha
    if (!formData.senha) {
      errors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < MIN_SENHA_LENGTH) {
      errors.senha = `A senha deve ter pelo menos ${MIN_SENHA_LENGTH} caracteres`;
    } else if (formData.senha.length > MAX_SENHA_LENGTH) {
      errors.senha = `A senha deve ter no máximo ${MAX_SENHA_LENGTH} caracteres`;
    } else if (!SENHA_REGEX.test(formData.senha)) {
      errors.senha = "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial";
    }
    
    // Validação de confirmação de senha
    if (formData.senha !== formData.confirmarSenha) {
      errors.confirmarSenha = "As senhas não coincidem";
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
        // Dados a serem enviados para a API - incluindo agora o campo bio
        const dadosParaEnvio = {
          nome: formData.nome.trim(),
          email: formData.email.trim(),
          telefone: formData.telefone,
          senha: formData.senha,
          bio: formData.bio.trim() || "" // Enviando o campo bio para o backend
        };

        // Fazendo a requisição para a API de cadastro
        const response = await fetch(`${API_URL}/usuarios/cadastro`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dadosParaEnvio),
        });

        const data = await response.json();
        
        if (response.ok) {
          // Cadastro bem-sucedido
          setCadastroSucesso(true);
          setFormData({
            nome: "",
            email: "",
            telefone: "",
            senha: "",
            confirmarSenha: "",
            bio: ""
          });
        } else {
          // Tratamento de erros específicos da API
          if (data.erro === "Email já cadastrado") {
            setFormErrors({ email: "Este email já está cadastrado" });
          } else {
            setFormErrors({ submit: data.erro || "Ocorreu um erro ao cadastrar. Tente novamente." });
          }
        }
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        setFormErrors({ 
          submit: "Erro de conexão com o servidor. Verifique sua conexão e tente novamente." 
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (cadastroSucesso) {
    return (
      <div className="container success-container">
        <div className="success-icon">✓</div>
        <h2>Cadastro Realizado com Sucesso!</h2>
        <p>Bem-vindo ao Blog Criativo, {formData.nome.split(' ')[0]}! Sua conta foi criada e você já pode fazer login para começar a compartilhar suas histórias.</p>
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
    );
  }

  return (
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
            maxLength={MAX_NOME_LENGTH}
          />
          <div className="input-counter">
            {formData.nome.length}/{MAX_NOME_LENGTH}
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
            maxLength={MAX_EMAIL_LENGTH}
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
            maxLength={MAX_TELEFONE_LENGTH}
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
            maxLength={MAX_BIO_LENGTH}
          />
          <div className="bio-counter">
            {formData.bio.length}/{MAX_BIO_LENGTH} caracteres
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
            maxLength={MAX_SENHA_LENGTH}
          />
          <div className="password-requirements">
            <p>A senha deve conter:</p>
            <ul>
              <li className={formData.senha.length >= MIN_SENHA_LENGTH ? 'fulfilled' : ''}>
                Pelo menos {MIN_SENHA_LENGTH} caracteres
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
            maxLength={MAX_SENHA_LENGTH}
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
  );
};

export default Cadastro;
