# Meus Podcasts - Frontend

<div align="center">
  <h3 align="center">Meus Podcasts</h3>
  <p align="center">
    Uma plataforma para gerenciar e explorar seus podcasts favoritos.
    <br />
    <a href="https://github.com/gav1ao/my-podcasts-frontend"><strong>Explore a documentação »</strong></a>
    <br />
    <br />
    <a href="#">Ver Demo</a>
    ·
    <a href="https://github.com/gav1ao/my-podcasts-frontend/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/gav1ao/my-podcasts-frontend/issues">Solicitar Feature</a>
  </p>
</div>

---

## Sobre o Projeto

O **Meus Podcasts** é uma aplicação frontend que permite aos usuários explorar, favoritar e gerenciar podcasts. A interface é simples e intuitiva, com suporte para login, cadastro e importação de podcasts via RSS Feed.

### Funcionalidades

-   Login e Cadastro de Usuários
-   Favoritar e Remover Podcasts
-   Importar Podcasts via RSS Feed
-   Interface Responsiva

---

## Tecnologias Utilizadas

-   **HTML5** e **CSS3** para estrutura e estilo
-   **JavaScript** para lógica e interatividade
-   **Fetch API** para comunicação com o backend
-   **LocalStorage** para persistência de tokens

---

## Estrutura do Projeto

```plaintext
.
├── index.html                # Página principal
├── styles/
│   └── styles.css            # Estilos da aplicação
├── scripts/
│   ├── auth.js               # Gerenciamento de autenticação
│   ├── cadastro.js           # Lógica de cadastro de usuários
│   ├── config.js             # Configurações globais
│   ├── exceptions.js         # Classes de erro personalizadas
│   ├── home.js               # Lógica da página inicial
│   ├── login.js              # Lógica de login
├── img/                      # Imagens e ícones
│   ├── favorite-star-filled.svg
│   ├── favorite-star-not-filled.svg
│   └── loading-icon.svg
├── .editorconfig             # Configurações do editor
├── .prettierrc               # Configurações do Prettier
└── README.md                 # Documentação do projeto
```

---

## Como Começar

### Pré-requisitos

Certifique-se de ter o seguinte instalado:

-   Navegador moderno (Google Chrome, Firefox, etc.)

### Instalação

1. Clone o repositório:

    ```sh
    git clone https://github.com/gav1ao/my-podcasts-frontend.git
    ```

2. Navegue até o diretório do projeto:

    ```sh
    cd my-podcasts-frontend
    ```

3. É necessário configurar o caminho da API no arquivo `config.js`.

    - Abra o arquivo localizado em `scripts/config.js` e altere o valor da URL base para o endereço da API que você deseja utilizar:
        ```js
        // [config.js]
        const API_BASE_URL = "http://seu-endereco-da-api.com";
        ```
    - Por padrão, a API está configurada para `http://localhost:8080`;
    - Certifique-se de que a API esteja rodando corretamente. O repositório da API relacionada pode ser encontrado aqui: [https://github.com/gav1ao/my-podcasts-backend](https://github.com/gav1ao/my-podcasts-backend)

4. Por fim, abra o arquivo `index.html` em um navegador.

## Uso

1. Acesse a página inicial.
2. Faça login ou cadastre-se.
3. Explore os podcasts disponíveis e adicione aos favoritos.
4. Importe novos podcasts via RSS Feed.

## Contribuição

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`).
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`).
4. Faça um push para a branch (`git push origin feature/NovaFeature`).
5. Abra um Pull Request.

## Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

## Contato

Vítor Gavião - [@vigal_jan](https://x.com/vigal_jan) - vitor.gaviao@protonmail.com

Link do Projeto: [https://github.com/gav1ao/my-podcasts-frontend](https://github.com/gav1ao/my-podcasts-frontend)

Link da API relacionada: [https://github.com/gav1ao/my-podcasts-backend](https://github.com/gav1ao/my-podcasts-backend)
