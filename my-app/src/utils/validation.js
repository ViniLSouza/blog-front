/**
 * Módulo de validação de formulários
 * Contém funções para validar os formulários de cadastro e login
 */
import { VALIDATION, REGEX } from './constants';

/**
 * Valida o formulário de cadastro de usuário
 * @param {Object} formData - Dados do formulário
 * @param {string} formData.nome - Nome do usuário
 * @param {string} formData.email - Email do usuário
 * @param {string} formData.telefone - Telefone do usuário
 * @param {string} formData.bio - Biografia do usuário (opcional)
 * @param {string} formData.senha - Senha do usuário
 * @param {string} formData.confirmarSenha - Confirmação da senha
 * @returns {Object} Objeto contendo mensagens de erro para cada campo inválido
 */
export const validateCadastroForm = (formData) => {
  const errors = {};
  
  /**
   * Validação do campo Nome:
   * - Não pode estar vazio
   * - Deve respeitar o limite máximo de caracteres
   */
  if (!formData.nome.trim()) {
    errors.nome = "Nome é obrigatório";
  } else if (formData.nome.length > VALIDATION.MAX_NOME_LENGTH) {
    errors.nome = `Nome deve ter no máximo ${VALIDATION.MAX_NOME_LENGTH} caracteres`;
  }
  
  /**
   * Validação do campo Email:
   * - Não pode estar vazio
   * - Deve respeitar o limite máximo de caracteres
   * - Deve seguir o formato padrão de email
   */
  if (!formData.email.trim()) {
    errors.email = "Email é obrigatório";
  } else if (formData.email.length > VALIDATION.MAX_EMAIL_LENGTH) {
    errors.email = `Email deve ter no máximo ${VALIDATION.MAX_EMAIL_LENGTH} caracteres`;
  } else if (!REGEX.EMAIL.test(formData.email)) {
    errors.email = "Formato de email inválido";
  }
  
  /**
   * Validação do campo Telefone:
   * - Não pode estar vazio
   * - Deve seguir o formato (XX) XXXXX-XXXX
   */
  if (!formData.telefone.trim()) {
    errors.telefone = "Telefone é obrigatório";
  } else if (!REGEX.TELEFONE.test(formData.telefone)) {
    errors.telefone = "Formato deve ser (XX) XXXXX-XXXX";
  }
  
  /**
   * Validação do campo Bio (opcional):
   * - Se preenchido, deve respeitar o limite máximo de caracteres
   */
  if (formData.bio && formData.bio.length > VALIDATION.MAX_BIO_LENGTH) {
    errors.bio = `A biografia deve ter no máximo ${VALIDATION.MAX_BIO_LENGTH} caracteres`;
  }
  
  /**
   * Validação do campo Senha:
   * - Não pode estar vazio
   * - Deve ter um tamanho mínimo
   * - Deve ter um tamanho máximo
   * - Deve conter caracteres especiais conforme regex
   */
  if (!formData.senha) {
    errors.senha = "Senha é obrigatória";
  } else if (formData.senha.length < VALIDATION.MIN_SENHA_LENGTH) {
    errors.senha = `A senha deve ter pelo menos ${VALIDATION.MIN_SENHA_LENGTH} caracteres`;
  } else if (formData.senha.length > VALIDATION.MAX_SENHA_LENGTH) {
    errors.senha = `A senha deve ter no máximo ${VALIDATION.MAX_SENHA_LENGTH} caracteres`;
  } else if (!REGEX.SENHA.test(formData.senha)) {
    errors.senha = "A senha deve conter pelo menos uma letra maiúscula, uma minúscula, um número e um caractere especial";
  }
  
  /**
   * Validação da confirmação de senha:
   * - Deve ser igual à senha informada
   */
  if (formData.senha !== formData.confirmarSenha) {
    errors.confirmarSenha = "As senhas não coincidem";
  }
  
  return errors;
};

/**
 * Valida o formulário de login
 * @param {Object} formData - Dados do formulário
 * @param {string} formData.email - Email do usuário
 * @param {string} formData.senha - Senha do usuário
 * @returns {Object} Objeto contendo mensagens de erro para cada campo inválido
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  /**
   * Validação do campo Email:
   * - Não pode estar vazio
   */
  if (!formData.email.trim()) {
    errors.email = "Email é obrigatório";
  }
  
  /**
   * Validação do campo Senha:
   * - Não pode estar vazio
   */
  if (!formData.senha) {
    errors.senha = "Senha é obrigatória";
  }
  
  return errors;
}; 