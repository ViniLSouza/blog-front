// Constantes para APIs
export const API_URL = "api";

// Constantes para validação
export const VALIDATION = {
  MAX_NOME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 100,
  MAX_TELEFONE_LENGTH: 15,
  MIN_SENHA_LENGTH: 6,
  MAX_SENHA_LENGTH: 50,
  MAX_BIO_LENGTH: 500
};

// Regex para validação
export const REGEX = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  TELEFONE: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  SENHA: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
}; 