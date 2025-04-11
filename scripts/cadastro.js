const casdastrarUsuario = async () => {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    try {
        const response = await fetch(`${API_BASE_URL}/usuario`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome,
                email,
                senha,
            }),
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar usuário");
        }

        renderizarLogin();
    } catch (error) {
        console.error("Erro:", error);

        alert(
            "Ocorreu um erro inesperado durante o cadastro. Tente novamente..."
        );
    }
};

const renderizarCadastro = () => {
    app.innerHTML = /*html*/ `
        <section id="pagina-cadastro" class="page">
            <h1>Crie sua Conta</h1>
            <form id="cadastro-form">
                <label for="nome">Nome:</label>
                <input type="text"
                       id="nome"
                       minlength="3"
                       maxlength="100"
                       required
                />

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

                <button type="submit">Cadastrar</button>
                <p>
                    Já tem uma conta?
                    <button type="button"
                            id="btnFacaLogin"
                            class="link-button"
                    >
                        Faça login
                    </button>
                </p>
            </form>
        </section>
    `;

    const btnFacaLogin = document.getElementById("btnFacaLogin");
    btnFacaLogin.addEventListener("click", (event) => {
        event.preventDefault();
        renderizarLogin();
    });

    const authForm = document.getElementById("cadastro-form");
    authForm.addEventListener("submit", (event) => {
        event.preventDefault();
        casdastrarUsuario();
    });
};
