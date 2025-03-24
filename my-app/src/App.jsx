import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Router from './routes/Router';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App; 