import { useAuth } from '../../contexts/AuthContext';
import './Home.css';

const Home = ({ navigate }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">
          <span role="img" aria-label="blog icon">✍️</span> Blog
        </div>
        <div className="user-menu">
          <span className="welcome-message">Olá, {user?.nome?.split(' ')[0]}</span>
          <button className="logout-button" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <main className="main-content">
        <section className="welcome-section">
          <h1>Bem-vindo à Home</h1>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Blog. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Home; 