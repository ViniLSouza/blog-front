# 🌶️ Tempero Compartilhado - Blog de Culinária

Uma plataforma para compartilhar receitas e experiências culinárias.

## 📋 Sobre o Projeto

O Tempero Compartilhado é uma aplicação web moderna que permite aos usuários compartilharem suas receitas favoritas, dicas culinárias e experiências na cozinha. A plataforma oferece uma interface intuitiva e responsiva, facilitando a interação entre os usuários.

### 🎯 Funcionalidades

- **Autenticação de Usuários**
  - Cadastro de novos usuários com validações
  - Login com email e senha
  - Recuperação de senha
  - Validação de força de senha

- **Publicações**
  - Criação de posts com título e conteúdo
  - Edição de publicações existentes
  - Exclusão de publicações com confirmação
  - Visualização de posts de outros usuários
  - Editor de texto rico para formatação

- **Perfil do Usuário**
  - Edição completa do perfil
  - Alteração de senha com validação
  - Confirmação de senha atual para mudanças
  - Histórico de publicações
  - Configurações da conta

- **Interação**
  - Comentários em publicações
  - Sistema de curtidas
  - Compartilhamento de receitas
  - Feedback visual de interações

## 🛠️ Tecnologias Utilizadas

- **Frontend**
  - React.js 18
  - Vite 4
  - CSS Modules
  - React Router v6
  - Context API
  - Axios para requisições HTTP

- **Backend**
  - Node.js
  - Express
  - PostgreSQL
  - JWT para autenticação
  - Bcrypt para criptografia

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
├── contexts/      # Contextos React (Auth, Theme)
├── pages/         # Páginas da aplicação
│   ├── Home/      # Página principal
│   ├── Login/     # Autenticação
│   ├── Cadastro/  # Registro
│   ├── EditarPerfil/ # Edição de perfil
│   └── CriarPost/ # Criação de posts
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
  - Erro: #DC3545
  - Sucesso: #28A745
  - Alerta: #FFC107

- **Tipografia**
  - Fonte Principal: Poppins
  - Tamanhos: xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px)

- **Espaçamento**
  - Padding: 0.5rem, 1rem, 1.5rem, 2rem, 2.5rem
  - Margin: 0.5rem, 1rem, 1.5rem, 2rem, 2.5rem
  - Gap: 0.5rem, 1rem, 1.5rem

- **Bordas**
  - Raio: 4px, 8px, 12px, 16px
  - Espessura: 1px, 2px
  - Estados: normal, hover, focus, error

## 🔒 Validações e Segurança

- **Validação de Formulários**
  - Campos obrigatórios
  - Formato de email
  - Força de senha (maiúsculas, minúsculas, números, caracteres especiais)
  - Confirmação de senha
  - Tamanho mínimo e máximo de campos
  - Feedback visual de erros

- **Segurança**
  - Proteção contra XSS
  - Autenticação via JWT
  - Rotas protegidas
  - Sanitização de inputs
  - Confirmação de senha para alterações sensíveis
  - Tokens de acesso com expiração

## 📱 Responsividade

O projeto é totalmente responsivo e se adapta aos seguintes breakpoints:

- 📱 Mobile: < 600px
  - Layout simplificado
  - Menu hamburguer
  - Cards em coluna única

- 📱 Tablet: 600px - 960px
  - Layout adaptativo
  - Cards em duas colunas
  - Menu expandido

- 💻 Desktop: > 960px
  - Layout completo
  - Cards em três colunas
  - Sidebar fixa

## 🎨 Estilização

- Uso de variáveis CSS para consistência
- Animações suaves para melhor UX
- Design moderno e limpo
- Feedback visual para interações
- Modais com overlay e animações
- Indicadores de carregamento
- Mensagens de sucesso/erro
- Tooltips informativos

## 🔄 Atualizações Recentes

### Versão 1.1.0
- Adicionada página de edição de perfil
- Implementado modal de confirmação de senha
- Melhorada validação de formulários
- Adicionado indicador de força de senha
- Corrigidos bugs de autenticação
- Melhorada a responsividade geral
- Atualizada a documentação

---

⭐️ Se você gostou deste projeto, por favor, deixe uma estrela no GitHub!
