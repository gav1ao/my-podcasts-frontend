function logar() {
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            senha,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                if (response.status === 401) {
                    throw new UnauthorizedError("Email ou senha inválidos");
                }

                throw new Error("Erro ao fazer login");
            }
            return response.json();
        })
        .then((data) => {
            const token = data?.access_token;
            if (!token) {
                throw new Error("Token não encontrado");
            }
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

            const refreshToken = data?.refresh_token;
            if (refreshToken) {
                localStorage.setItem(
                    LOCAL_STORAGE_REFRESH_TOKEN_KEY,
                    refreshToken
                );
            }

            renderizarHome();
        })
        .catch((error) => {
            console.error("Erro:", error);

            if (error instanceof UnauthorizedError) {
                alert(error.message);
                return;
            }

            alert(
                "Ocorreu um erro inesperado durante o login. Tente novamente..."
            );
        });
}

const renderizarLogin = () => {
    app.innerHTML = /*html*/ `
        <section id="auth-page" class="page">
           <h1>Bem-vindo aos Meus Podcasts</h1>
           <form id="auth-form">
               <label for="email">E-mail:</label>
               <input type="email"
                      id="email"
                      minlength="10"
                      maxlength="100"
                      required
               />

               <label for="senha">Senha:</label>
               <input type="password"
                      id="senha"
                      minlength="6"
                      maxlength="100"
                      required
               />

               <button type="submit">Entrar</button>
               <p>
                     Não tem uma conta?
                    <button type="button"
                            id="btnCadastrar"
                            class="link-button"
                    >
                        Cadastre-se
                    </button>
                </p>
           </form>
        </section>
    `;

    const btnCadastrar = document.getElementById("btnCadastrar");
    btnCadastrar.addEventListener("click", (event) => {
        event.preventDefault();
        renderizarCadastro();
    });

    const authForm = document.getElementById("auth-form");
    authForm.addEventListener("submit", (event) => {
        event.preventDefault();
        logar();
    });
};
