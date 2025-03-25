# 🌶️ Tempero Compartilhado - Blog de Culinária

Um blog interativo de culinária onde os usuários podem compartilhar suas receitas, experiências e dicas gastronômicas. Desenvolvido com React e Vite, oferece uma experiência moderna e responsiva para os amantes da culinária.

## 🚀 Funcionalidades

- **Autenticação de Usuários**
  - Cadastro com validação de dados
  - Login seguro
  - Gerenciamento de sessão

- **Gestão de Posts**
  - Criação de posts com título e conteúdo
  - Edição de posts próprios
  - Exclusão de posts
  - Suporte a emojis
  - Formatação de texto

- **Interface Responsiva**
  - Design adaptável para diferentes dispositivos
  - Animações suaves
  - Feedback visual para ações do usuário
  - Modal para edição de posts

## 🛠️ Tecnologias Utilizadas

- **Frontend**
  - React 18
  - Vite
  - CSS Modules
  - Context API para gerenciamento de estado

- **Ferramentas de Desenvolvimento**
  - ESLint para qualidade de código
  - Git para controle de versão
  - npm para gerenciamento de pacotes

## 📦 Estrutura do Projeto

```
src/
├── pages/           # Componentes de página
│   ├── Home/        # Página principal
│   ├── Login/       # Página de login
│   ├── Cadastro/    # Página de cadastro
│   └── CriarPost/   # Página de criação de post
├── services/        # Serviços de API
│   ├── apiService   # Configuração e chamadas de API
│   └── authService  # Serviço de autenticação
├── utils/           # Utilitários
│   ├── constants    # Constantes da aplicação
│   ├── formatters   # Funções de formatação
│   └── validation   # Funções de validação
├── contexts/        # Contextos React
│   └── AuthContext  # Contexto de autenticação
└── components/      # Componentes reutilizáveis
```

## 🚀 Como Executar

1. **Clone o repositório**
   ```bash
   git clone https://github.com/ViniLSouza/blog-front.git
   cd blog-front/my-app
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as variáveis necessárias (veja `.env.example`)

4. **Execute o projeto**
   ```bash
   npm run dev
   ```

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

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add: nova funcionalidade'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Convenções de Código

- **Commits**: Seguimos o padrão Conventional Commits
  - `feat:` para novas funcionalidades
  - `fix:` para correções de bugs
  - `docs:` para atualizações de documentação
  - `style:` para mudanças de formatação
  - `refactor:` para refatorações de código
  - `test:` para adição/modificação de testes

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- Vinícius Souza - Desenvolvedor Fullstack
- Felipe Souza - Desenvolvedor Fullstack

## 📞 Suporte

Para suporte, envie um email para [vinicius.luciano2603@gmail.com] ou abra uma issue no GitHub.

---

⭐️ Se você gostou deste projeto, por favor, deixe uma estrela no GitHub!
