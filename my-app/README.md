# 🌶️ Tempero Compartilhado - Blog de Culinária

Uma plataforma para compartilhar receitas e experiências culinárias.

## 📋 Sobre o Projeto

O Tempero Compartilhado é uma aplicação web moderna que permite aos usuários compartilharem suas receitas favoritas, dicas culinárias e experiências na cozinha. A plataforma oferece uma interface intuitiva e responsiva, facilitando a interação entre os usuários.

### 🎯 Funcionalidades

- **Autenticação de Usuários**
  - Cadastro de novos usuários
  - Login com email e senha
  - Recuperação de senha

- **Publicações**
  - Criação de posts com título e conteúdo
  - Edição de publicações existentes
  - Exclusão de publicações
  - Visualização de posts de outros usuários

- **Perfil do Usuário**
  - Personalização do perfil
  - Histórico de publicações
  - Configurações da conta

- **Interação**
  - Comentários em publicações
  - Sistema de curtidas
  - Compartilhamento de receitas

## 🛠️ Tecnologias Utilizadas

- **Frontend**
  - React.js
  - Vite
  - CSS Modules
  - React Router
  - Context API

- **Backend**
  - Node.js
  - Express
  - PostgreSQL
  - JWT para autenticação

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- PostgreSQL

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/tempero-compartilhado.git
cd tempero-compartilhado
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Acesse a aplicação em `http://localhost:5173`

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis
├── contexts/      # Contextos React
├── pages/         # Páginas da aplicação
├── services/      # Serviços e APIs
├── utils/         # Funções utilitárias
└── styles/        # Estilos globais
```

## 🎨 Design System

O projeto utiliza um design system consistente com as seguintes características:

- **Cores**
  - Primária: #FF6B6B
  - Secundária: #4ECDC4
  - Fundo: #F8F9FA
  - Texto: #343A40

- **Tipografia**
  - Fonte Principal: Poppins
  - Tamanhos: xs, sm, base, lg, xl, 2xl, 3xl

- **Espaçamento**
  - Padding: 0.5rem, 1rem, 1.5rem, 2rem, 2.5rem
  - Margin: 0.5rem, 1rem, 1.5rem, 2rem, 2.5rem

- **Bordas**
  - Raio: 4px, 8px, 12px, 16px
  - Espessura: 1px, 2px

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **VFelipe Souza** - *Back-End* - [souza-felipe](https://github.com/souza-felipe)
- **Vinicius Luciano** - *Front-End* - [ViniLSouza](https://github.com/ViniLSouza)

## 🙏 Agradecimentos

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)

## 🔒 Validações e Segurança

- Validação de campos de formulário
- Proteção contra XSS
- Autenticação via JWT
- Rotas protegidas
- Sanitização de inputs

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta aos seguintes breakpoints:

- 📱 Mobile: < 600px
- 📱 Tablet: 600px - 960px
- 💻 Desktop: > 960px

## 🎨 Estilização

- Uso de variáveis CSS para consistência
- Animações suaves para melhor UX
- Design moderno e limpo
- Feedback visual para interações

## 📞 Suporte

Para suporte, envie um email para [vinicius.luciano2603@gmail.com] ou abra uma issue no GitHub.

---

⭐️ Se você gostou deste projeto, por favor, deixe uma estrela no GitHub!
