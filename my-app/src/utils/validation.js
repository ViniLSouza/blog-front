import { VALIDATION, REGEX } from './constants';

/**
 * Valida o formulário de cadastro
 * @param {Object} formData - Dados do formulário
 * @returns {Object} - Objeto com erros de validação
 */
export const validateCadastroForm = (formData) => {
  const errors = {};
  
  // Validação do Nome
  if (!formData.nome.trim()) {
    errors.nome = "Nome é obrigatório";
  } else if (formData.nome.length > VALIDATION.MAX_NOME_LENGTH) {
    errors.nome = `Nome deve ter no máximo ${VALIDATION.MAX_NOME_LENGTH} caracteres`;
  }
  
  // Validação do Email
  if (!formData.email.trim()) {
    errors.email = "Email é obrigatório";
  } else if (formData.email.length > VALIDATION.MAX_EMAIL_LENGTH) {
    errors.email = `Email deve ter no máximo ${VALIDATION.MAX_EMAIL_LENGTH} caracteres`;
  } else if (!REGEX.EMAIL.test(formData.email)) {
    errors.email = "Formato de email inválido";
  }
  
  // Validação do Telefone
  if (!formData.telefone.trim()) {
    errors.telefone = "Telefone é obrigatório";
  } else if (!REGEX.TELEFONE.test(formData.telefone)) {
    errors.telefone = "Formato deve ser (XX) XXXXX-XXXX";
  }
  
  // Validação da Bio
  if (formData.bio && formData.bio.length > VALIDATION.MAX_BIO_LENGTH) {
    errors.bio = `A biografia deve ter no máximo ${VALIDATION.MAX_BIO_LENGTH} caracteres`;
  }
  
  // Validação da Senha
  if (!formData.senha) {
    errors.senha = "Senha é obrigatória";
  } else if (formData.senha.length < VALIDATION.MIN_SENHA_LENGTH) {
    errors.senha = `A senha deve ter pelo menos ${VALIDATION.MIN_SENHA_LENGTH} caracteres`;
  } else if (formData.senha.length > VALIDATION.MAX_SENHA_LENGTH) {
    errors.senha = `A senha deve ter no máximo ${VALIDATION.MAX_SENHA_LENGTH} caracteres`;
  } else if (!REGEX.SENHA.test(formData.senha)) {
    errors.senha = "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial";
  }
  
  // Validação de confirmação de senha
  if (formData.senha !== formData.confirmarSenha) {
    errors.confirmarSenha = "As senhas não coincidem";
  }
  
  return errors;
};

/**
 * Valida o formulário de login
 * @param {Object} formData - Dados do formulário
 * @returns {Object} - Objeto com erros de validação
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  if (!formData.email.trim()) {
    errors.email = "Email é obrigatório";
  }
  
  if (!formData.senha) {
    errors.senha = "Senha é obrigatória";
  }
  
  return errors;
}; 