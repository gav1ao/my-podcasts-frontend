const renovarToken = async () => {
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    if (!refreshToken) {
        console.warn("Refresh token não encontrado.");
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

        renderizarLogin();
        alert("Faça login novamente para continuar.");

        return;
    }

    const response = await fetch(`${API_BASE_URL}/refresh`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        console.warn("Erro ao renovar o token:", response.status);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

        renderizarLogin();
        alert("Faça login novamente para continuar.");

        return;
    }

    const data = await response.json();
    const novoToken = data?.access_token;
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, novoToken);

    return obterToken();
};

const obterToken = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    return `Bearer ${token}`;
};
