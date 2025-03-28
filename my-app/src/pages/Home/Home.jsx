/**
 * Página principal do blog
 * Responsável por exibir, criar, editar e excluir posts
 */
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import './Home.css';

/**
 * Componente Home
 * @param {Object} props - Propriedades do componente
 * @param {Function} props.navigate - Função de navegação do React Router
 */
const Home = ({ navigate }) => {
  // Estados para gerenciamento de autenticação
  const { user, logout } = useAuth();

  // Estados para gerenciamento de posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Estados para o formulário de criação de post
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postError, setPostError] = useState('');

  // Estados para o seletor de emojis
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const MAX_CONTENT_LENGTH = 4000;

  // Estados para edição de post
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    titulo: '',
    conteudo: ''
  });

  // Estados para confirmação de exclusão
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  /**
   * Carrega os posts ao montar o componente
   */
  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Busca todos os posts da API
   */
  const fetchPosts = async () => {
    try {
      const response = await apiService.get('/posts');
      setPosts(response);
      console.log('Posts recebidos:', response);
    } catch (error) {
      setError('Erro ao carregar os posts');
      console.error('Erro ao buscar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Realiza o logout do usuário e redireciona para a página de login
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  /**
   * Manipula as mudanças nos campos do formulário de criação
   * @param {Event} e - Evento de mudança
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'conteudo' && value.length > MAX_CONTENT_LENGTH) {
      return;
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /**
   * Adiciona um emoji ao conteúdo do post
   * @param {string} emoji - Emoji selecionado
   */
  const handleEmojiClick = (emoji) => {
    const newContent = formData.conteudo + emoji;
    if (newContent.length <= MAX_CONTENT_LENGTH) {
      setFormData(prevState => ({
        ...prevState,
        conteudo: newContent
      }));
    }
    setShowEmojiPicker(false);
  };

  // Lista de emojis disponíveis
  const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🌟', '🔥', '💡', '🌶️', '🍽️', '👨‍🍳', '🥘'];

  /**
   * Envia o formulário de criação de post
   * @param {Event} e - Evento de submit
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPostError('');
    setIsSubmitting(true);

    try {
      const now = new Date();
      const postData = {
        titulo: formData.titulo,
        conteudo: formData.conteudo,
        usuarioId: user.id,
        dataCriacao: now.toISOString()
      };

      console.log('Enviando post com data:', postData.dataCriacao);
      await apiService.post('/posts', postData);
      setFormData({ titulo: '', conteudo: '' });
      fetchPosts();
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setPostError('Erro ao criar post. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Formata uma data para o formato brasileiro
   * @param {string} dateString - Data em formato ISO
   * @returns {string} Data formatada
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Data não disponível';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Data inválida';

      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(date);
    } catch (error) {
      console.error('Erro ao formatar data:', dateString, error);
      return 'Data inválida';
    }
  };

  /**
   * Inicia a edição de um post
   * @param {Object} post - Post a ser editado
   */
  const handleEdit = (post) => {
    setEditingPost(post);
    setEditFormData({
      titulo: post.titulo,
      conteudo: post.conteudo
    });
  };

  /**
   * Manipula as mudanças nos campos do formulário de edição
   * @param {Event} e - Evento de mudança
   */
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Envia as alterações do post para a API
   */
  const handleEditSubmit = async () => {
    try {
      setLoading(true);
      await apiService.put(`/posts/${editingPost.id}`, editFormData);
      
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, ...editFormData }
          : post
      ));
      
      setEditingPost(null);
    } catch (error) {
      console.error('Erro ao editar post:', error);
      setError('Erro ao editar post. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Inicia o processo de exclusão de um post
   * @param {Object} post - Post a ser excluído
   */
  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteConfirm(true);
  };

  /**
   * Confirma e realiza a exclusão do post
   */
  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await apiService.delete(`/posts/${postToDelete.id}`);
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      setShowDeleteConfirm(false);
      setPostToDelete(null);
      setEditingPost(null);
    } catch (error) {
      console.error('Erro ao excluir post:', error);
      setError('Erro ao excluir post. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      {/* Cabeçalho com logo e menu do usuário */}
      <header className="header">
        <div className="logo">
          <span role="img" aria-label="blog icon">🌶️</span> Tempero Compartilhado
        </div>
        <div className="user-menu">
          <span className="welcome-message">Olá, {user?.nome?.split(' ')[0]}</span>
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* Seção de criação de post */}
        <section className="create-post-section">
          <form onSubmit={handleSubmit} className="post-form">
            <div className="form-group">
              <label htmlFor="titulo">
                Título <span className="required-star">*</span>
              </label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                maxLength={100}
                className="form-control"
                placeholder="Título da sua publicação"
              />
            </div>

            <div className="form-group">
              <label htmlFor="conteudo">
                Conteúdo <span className="required-star">*</span>
              </label>
              <div className="textarea-container">
                <textarea
                  id="conteudo"
                  name="conteudo"
                  value={formData.conteudo}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="form-control"
                  placeholder="O que você quer compartilhar hoje?"
                />
                {/* Rodapé do textarea com contador de caracteres e botão de emoji */}
                <div className="textarea-footer">
                  <button 
                    type="button" 
                    className="emoji-button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    title="Adicionar emoji"
                  >
                    😊
                  </button>
                  <span className="character-count">
                    {formData.conteudo.length}/{MAX_CONTENT_LENGTH}
                  </span>
                </div>
                {/* Seletor de emojis */}
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        type="button"
                        className="emoji-option"
                        onClick={() => handleEmojiClick(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {postError && <div className="error-message">{postError}</div>}

            <button 
              type="submit" 
              className="submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Publicando...' : 'Publicar'}
            </button>
          </form>
        </section>

        {/* Seção de exibição de posts */}
        <section className="posts-section">
          <div className="posts-grid">
            {posts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <span>{post.usuario?.nome || 'Usuário Anônimo'}</span>
                  <div className="post-meta-right">
                    {post.usuarioId === user?.id && (
                      <button
                        className="edit-button"
                        onClick={() => handleEdit(post)}
                        aria-label="Editar post"
                      >
                        ✏️
                      </button>
                    )}
                    <span>{formatDate(post.dataCriacao)}</span>
                  </div>
                </div>
                <h2 className="post-title">{post.titulo}</h2>
                <p className="post-content">{post.conteudo}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Modal de edição de post */}
      {editingPost && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Editar Publicação</h2>
              <button 
                className="close-button"
                onClick={() => setEditingPost(null)}
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="edit-titulo">
                  Título <span className="required-star">*</span>
                </label>
                <input
                  type="text"
                  id="edit-titulo"
                  name="titulo"
                  value={editFormData.titulo}
                  onChange={handleEditChange}
                  className="form-control"
                  placeholder="Título da publicação"
                  maxLength={100}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="edit-conteudo">
                  Conteúdo <span className="required-star">*</span>
                </label>
                <textarea
                  id="edit-conteudo"
                  name="conteudo"
                  value={editFormData.conteudo}
                  onChange={handleEditChange}
                  className="form-control"
                  rows={6}
                  placeholder="Conteúdo da publicação"
                  required
                />
                <div className="character-count">
                  {editFormData.conteudo.length}/{MAX_CONTENT_LENGTH} caracteres
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
            </div>
            <div className="modal-footer">
              <button 
                className="delete-button"
                onClick={() => handleDeleteClick(editingPost)}
                title="Excluir publicação"
              >
                Excluir
              </button>
              <div className="action-buttons">
                <button 
                  className="cancel-button"
                  onClick={() => setEditingPost(null)}
                >
                  Cancelar
                </button>
                <button 
                  className="save-button"
                  onClick={handleEditSubmit}
                  disabled={loading}
                >
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação de exclusão */}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal delete-modal">
            <div className="modal-header">
              <h2>Confirmar Exclusão</h2>
              <button 
                className="close-button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setPostToDelete(null);
                }}
                aria-label="Fechar modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p>Tem certeza que deseja excluir esta publicação?</p>
              <p>Esta ação não pode ser desfeita.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="cancel-button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setPostToDelete(null);
                }}
              >
                Cancelar
              </button>
              <button 
                className="delete-button"
                onClick={handleDeleteConfirm}
                disabled={loading}
              >
                {loading ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Tempero Compartilhado. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home; 