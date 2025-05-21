# Clean-Bank-Tech-Challenge-Fiap-Mobile

## 📄 Descrição

O **Clean-Bank-Tech-Challenge-Fiap-Mobile** é um aplicativo desenvolvido com **React Native** e **Expo**, que integra diversos recursos modernos para garantir uma experiência fluida e segura.

O projeto conta com:

- **Navegação avançada** via React Navigation (Drawer e Stack);
- **Formulários otimizados** com React Hook Form e Zod;
- **Autenticação e armazenamento** com Firebase (Auth, Firestore e Storage);
- **Interface moderna e responsiva** utilizando Gluestack-UI com TailwindCSS;
- **Padronização de código** com commit-lint, Prettier, Husky, lint-staged e ESLint.

---

## ✨ Principais Destaques Técnicos

- Estrutura baseada na **Clean Architecture** (`Domain`, `Data`, `Infra`, `Presentation`, `Main`);
- Utilização de **TDD (Test-Driven Development)** e abordagem **AAA (Arrange, Act, Assert)**;
- Aplicação dos princípios **SOLID**;
- Gerenciamento de estado com **Redux**;
- **Dependency Injection (DI)** para controle de dependências;
- Padrões utilizados:
  - **Repository Pattern**
  - **Factory Pattern**
  - **System Under Test (SUT)** nos testes
- **Small Commits** com Git, promovendo histórico limpo e revisões eficientes;
- Interface moderna e altamente responsiva, com foco na **usabilidade do usuário**;
- **Lazy Loading com FlatList** para melhor performance em listas longas.

---

## ⚙️ Estrutura do Projeto

<pre>
<code class="language-text">├── domain # Entidades, casos de uso e contratos (interfaces)</code>
<code class="language-text">├── data # Implementações dos repositórios</code>
<code class="language-text">├── infra # Integrações externas (ex: Firebase)</code>
<code class="language-text">├── presentation # Componentes, páginas, hooks e UI</code>
<code class="language-text">├── main # Inicialização da aplicação, rotas e providers</code>
</pre>

## ☕ Tecnologias Utilizadas

- **React Native** com **Expo**
- **React Navigation** (Drawer e Stack)
- **React Hook Form** + **Zod**
- **Firebase** (Auth, Firestore e Storage)
- **Gluestack-UI** + **TailwindCSS**
- **Commit-lint**, **Prettier**, **Husky**, **Lint-staged**, **ESLint**

---

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você precisa instalar a versão mais recente do **NodeJS** e **Expo**.

## 🚀 Instalação e Execução

### 1. Clone o repositório:

```sh
  git clone https://github.com/lucas-ssv/bank-tech-challenge-fiap-mobile.git
  cd bank-tech-challenge-fiap-mobile
```

### 2. Instale as dependências:

```sh
  npm install
  # ou
  yarn install
```

### 3. Configure as variáveis de ambiente do Firebase:

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
EXPO_PUBLIC_APP_ID="SUA_APP_ID"
EXPO_PUBLIC_PROJECT_ID="SEU_PROJECT_ID"
EXPO_PUBLIC_API_KEY="SUA_API_KEY"
EXPO_PUBLIC_BUCKET_URL="SEU_BUCKET_URL"
```

### 4. Execute o projeto:

Para rodar o app, utilize um dos seguintes comandos:

```sh
  npm start       # Inicia o projeto no Expo
  npm run android # Executa no emulador ou dispositivo Android
  npm run ios     # Executa no simulador iOS (macOS apenas)
  npm run web     # Executa no navegador
```

### 5. Teste o projeto:

Para testar o app, utilize o seguinte comando:

```sh
  npm test       # Executa todos os testes
```
