import { API_URL } from '../utils/constants';

/**
 * Serviço para gerenciar autenticação de usuários
 */
export const authService = {
  /**
   * Realiza o cadastro de um novo usuário
   * @param {Object} userData - Dados do usuário (nome, email, telefone, senha, bio)
   * @returns {Promise} - Promise com a resposta da API
   */
  async cadastrar(userData) {
    try {
      console.log('Tentando cadastrar usuário:', userData.email);
      console.log('URL de cadastro:', `${API_URL}/usuarios/cadastro`);
      
      const response = await fetch(`${API_URL}/usuarios/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      console.log('Status da resposta de cadastro:', response.status);
      console.log('Headers da resposta:', [...response.headers.entries()]);
      
      // Verifica se o content-type da resposta é JSON
      const contentType = response.headers.get('content-type');
      console.log('Content-Type da resposta:', contentType);
      
      let responseData;
      let responseText;
      
      try {
        // Tentar ler o corpo da resposta como texto primeiro
        responseText = await response.text();
        console.log('Corpo da resposta (texto):', responseText);
        
        // Se parece ser JSON, fazer o parse
        if (responseText && (responseText.startsWith('{') || responseText.startsWith('['))) {
          responseData = JSON.parse(responseText);
          console.log('Corpo da resposta (JSON):', responseData);
        }
      } catch (parseError) {
        console.error('Erro ao fazer parse da resposta:', parseError);
      }
      
      if (!response.ok) {
        throw {
          status: response.status,
          message: responseData?.erro || 'Erro ao cadastrar usuário',
          data: responseData
        };
      }
      
      return responseData || { success: true };
    } catch (error) {
      console.error('Erro na requisição de cadastro:', error);
      // Se for um erro de rede, retorna uma mensagem amigável
      if (!error.status) {
        throw {
          message: 'Não foi possível conectar ao servidor. Verifique sua conexão e se o backend está rodando.',
        };
      }
      throw error;
    }
  },
  
  /**
   * Realiza o login de um usuário
   * @param {string} email - Email do usuário
   * @param {string} senha - Senha do usuário
   * @returns {Promise} - Promise com a resposta da API
   */
  async login(email, senha) {
    try {
      console.log('Tentando login com email:', email);
      console.log('URL de login:', `${API_URL}/usuarios/login`);
      
      const response = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });
      
      console.log('Status da resposta de login:', response.status);
      console.log('Headers da resposta:', [...response.headers.entries()]);
      
      // Verifica se o content-type da resposta é JSON
      const contentType = response.headers.get('content-type');
      console.log('Content-Type da resposta:', contentType);
      
      let responseData;
      let responseText;
      
      try {
        // Tentar ler o corpo da resposta como texto primeiro
        responseText = await response.text();
        console.log('Corpo da resposta (texto):', responseText);
        
        // Se parece ser JSON, fazer o parse
        if (responseText && (responseText.startsWith('{') || responseText.startsWith('['))) {
          responseData = JSON.parse(responseText);
          console.log('Corpo da resposta (JSON):', responseData);
        }
      } catch (parseError) {
        console.error('Erro ao fazer parse da resposta:', parseError);
      }
      
      if (!response.ok) {
        throw {
          status: response.status,
          message: responseData?.erro || 'Erro ao fazer login',
          data: responseData
        };
      }
      
      if (!responseData || !responseData.token) {
        throw {
          status: response.status,
          message: 'O servidor não retornou dados de autenticação válidos',
        };
      }
      
      // Salvar dados do usuário e token na localStorage
      this.setAuthData(responseData.token, responseData.usuario);
      
      return responseData.usuario;
    } catch (error) {
      console.error('Erro na requisição de login:', error);
      // Se for um erro de rede, retorna uma mensagem amigável
      if (!error.status) {
        throw {
          message: 'Não foi possível conectar ao servidor. Verifique sua conexão e se o backend está rodando.',
        };
      }
      throw error;
    }
  },
  
  /**
   * Realiza o logout do usuário
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },
  
  /**
   * Salva os dados de autenticação no localStorage
   * @param {string} token - Token JWT
   * @param {Object} usuario - Dados do usuário
   */
  setAuthData(token, usuario) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  },
  
  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean}
   */
  isAuthenticated() {
    return localStorage.getItem('token') !== null;
  },
  
  /**
   * Obtém os dados do usuário logado
   * @returns {Object|null}
   */
  getUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  },
  
  /**
   * Obtém o token de autenticação
   * @returns {string|null}
   */
  getToken() {
    return localStorage.getItem('token');
  }
}; 