import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { apiService } from '../../services/apiService';
import './CriarPost.css';

const CriarPost = ({ navigate }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const postData = {
        titulo: formData.titulo,
        conteudo: formData.conteudo,
        usuario_id: user.id,
        data_criacao: new Date().toISOString()
      };

      console.log('Enviando post:', postData);
      await apiService.post('/posts', postData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      setError('Erro ao criar post. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <span role="img" aria-label="blog icon">🌶️</span> Tempero Compartilhado
        </div>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <form onSubmit={handleSubmit}>
            <h2>Nova Publicação</h2>

            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                maxLength={100}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="conteudo">Conteúdo</label>
              <textarea
                id="conteudo"
                name="conteudo"
                value={formData.conteudo}
                onChange={handleChange}
                required
                rows={10}
                className="form-control"
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-group">
              <button 
                type="button" 
                onClick={() => navigate('/')}
                className="logout-button"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="create-post-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Publicando...' : 'Publicar'}
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Tempero Compartilhado. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default CriarPost; 