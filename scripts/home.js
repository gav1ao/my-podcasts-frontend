const PODCAST_FAVORITO_TITLE = "Adicionar aos favoritos";
const PODCAST_FAVORITO_ICON = "img/favorite-star-filled.svg";

const PODCAST_NAO_FAVORITO_TITLE = "Remover dos favoritos";
const PODCAST_NAO_FAVORITO_ICON = "img/favorite-star-not-filled.svg";

const carregarDominioHome = async () => {
    try {
        const podscastsPopulatesResponse = await fetch(
            `${API_BASE_URL}/podcast`
        );
        if (!podscastsPopulatesResponse.ok) {
            if (podscastsPopulatesResponse.status === 401) {
                throw new TokenError("Token expirado ou inválido");
            }

            throw new Error(
                `Erro ao obter podcasts populares. Status: ${response.status}`
            );
        }

        const meusPodcastsResponse = await fetch(
            `${API_BASE_URL}/usuario/podcast`,
            {
                method: "GET",
                headers: {
                    Authorization: obterToken(),
                },
            }
        );
        if (!meusPodcastsResponse.ok) {
            if (meusPodcastsResponse.status === 401) {
                throw new TokenError("Token expirado ou inválido");
            }

            throw new Error(
                `Erro ao obter podcasts do usuário. Status: ${response.status}`
            );
        }

        const podcastsPopulares = await podscastsPopulatesResponse.json();
        const meusPodcasts = await meusPodcastsResponse.json();

        const podscastsEscolhidos = meusPodcasts.map(({ id }) => id);

        const podcasts = podcastsPopulares.map((podcast) => {
            const isFavorito = podscastsEscolhidos.includes(podcast.id);
            return {
                ...podcast,
                favorito: isFavorito,
            };
        });

        return {
            podcasts,
            meusPodcasts,
        };
    } catch (error) {
        if (error instanceof TokenError) {
            await renovarToken();
            await carregarDominioHome();
            return;
        }

        console.error("Erro ao carregar podcasts:", error);
        alert("Ocorreu um erro inesperado ao carregar os podcasts.");
    }
};

const adicionarPodcast = async (podcastId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/usuario/podcast`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: obterToken(),
            },
            body: JSON.stringify({ podcast_id: podcastId }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new TokenError("Token expirado ou inválido");
            }

            throw new Error(
                `Erro ao adicionar podcast aos favoritos. Status: ${response.status}`
            );
        }

        await renderizarHome();
    } catch (error) {
        if (error instanceof TokenError) {
            await renovarToken();
            await adicionarPodcast(podcastId);
            return;
        }

        console.error("Erro ao adicionar podcast:", error);
        alert("Ocorreu um erro inesperado ao adicionar o podcast.");
    }
};

const removerPodcast = async (podcastId) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}/usuario/podcast/${podcastId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: obterToken(),
                },
            }
        );

        if (!response.ok) {
            if (response.status === 401) {
                throw new TokenError("Token expirado ou inválido");
            }

            throw new Error(
                `Erro ao remover podcast aos favoritos. Status: ${response.status}`
            );
        }

        await renderizarHome();
    } catch (error) {
        if (error instanceof TokenError) {
            await renovarToken();
            await removerPodcast(podcastId);
            return;
        }

        console.error("Erro ao remover podcast:", error);
        alert("Ocorreu um erro inesperado ao remover o podcast.");
    }
};

const importarPodcast = async () => {
    const urlInput = document.getElementById("url-podcast");
    const importarBtn = document.getElementById("importar-btn");

    const loadingIcon = document.querySelector(".loading");
    loadingIcon.classList.remove("hidden");

    urlInput.setAttribute("disabled", "true");
    importarBtn.setAttribute("disabled", "true");

    const errorMsg = document.querySelector(".importar-podcast-msg.error-msg");

    try {
        const url = urlInput.value.trim();
        const response = await fetch(`${API_BASE_URL}/podcast/importar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: obterToken(),
            },
            body: JSON.stringify({ rss_feed_url: url }),
        });
        if (!response.ok) {
            if (response.status === 401) {
                throw new TokenError("Token expirado ou inválido");
            }

            if (response.status === 409) {
                errorMsg.classList.remove("hidden");
                errorMsg.textContent =
                    "Esse podcast já está cadastrado. Tente outro.";
                urlInput.focus();
                return;
            }

            const responseErrorMsg = await response.json();
            throw new Error(responseErrorMsg.message);
        }

        urlInput.value = "";

        renderizarHome();
    } catch (error) {
        if (error instanceof TokenError) {
            await renovarToken();
            await importarPodcast();
            return;
        }

        console.error("Erro ao importar podcast:", error);

        errorMsg.classList.remove("hidden");
        errorMsg.textContent =
            "Ocorreu um erro inesperado ao importar o podcast.";

        urlInput.focus();
    } finally {
        loadingIcon.classList.add("hidden");
        urlInput.removeAttribute("disabled");
        importarBtn.removeAttribute("disabled");
    }
};

const renderizarHome = async () => {
    const { podcasts, meusPodcasts } = await carregarDominioHome();

    app.innerHTML = /*html*/ `
        <main id="home-page" class="page">
            <section class=container>
                <h1>Podcasts Populares</h1>
                ${
                    podcasts.length === 0
                        ? /*html*/ `
                            <p>Nenhum podcast cadastrado ainda.</p>
                        `
                        : ""
                }
                </div>
                <div class="podcast-list">
                    ${podcasts
                        .map(
                            (podcast) => /*html*/ `
                                <div class="podcast-card">
                                <div class="podcast-card-items">
                                    <img src="${podcast.poster_url}" alt="${
                                podcast.titulo
                            }" />
                                    <h4>${podcast.titulo}</h4>
                                    <h6>${podcast.autor}</h6>

                                    <img src="${
                                        podcast?.favorito
                                            ? PODCAST_FAVORITO_ICON
                                            : PODCAST_NAO_FAVORITO_ICON
                                    }"
                                            alt="Favorito"
                                            class="star-icon"
                                            data-id="${podcast.id}"
                                            title="${
                                                podcast?.favorito
                                                    ? PODCAST_FAVORITO_TITLE
                                                    : PODCAST_NAO_FAVORITO_TITLE
                                            }"
                                            data-favorito="${podcast?.favorito}"
                                    />
                                </div>
                            </div>
                        `
                        )
                        .join("")}
            </section>

            <section class=container>
                <h1>Importar Podcast</h1>
                <p>Importe um podcast a partir da URL de seu RSS Feed</p>
                <form id="importar-podcast-form">
                    <input type="text" id="url-podcast" placeholder="RSS Feed URL" required />
                    <img src="img/loading-icon.svg" alt="Carregando..." class="loading hidden" />
                    <button type="submit" id="importar-btn">Importar</button>
                </form>
                <p class="importar-podcast-msg error-msg hidden"></p>
            </section>

            <section class=container>
                <h1>Meus Podcasts</h1>
                ${
                    meusPodcasts.length === 0
                        ? /*html*/ `
                            <p>Você ainda possui podcasts favoritos.</p>
                        `
                        : ""
                }
                <div class="podcast-list">
                    ${meusPodcasts
                        .map(
                            (podcast) => /*html*/ `
                                <div class="podcast-card">
                                    <div class="podcast-card-items">
                                        <img src="${podcast.poster_url}" alt="${podcast.titulo}" />
                                        <h4>${podcast.titulo}</h4>
                                        <h6>${podcast.autor}</h6>

                                        <img src="${PODCAST_FAVORITO_ICON}"
                                                alt="Favorito"
                                                class="star-icon"
                                                data-id="${podcast.id}"
                                                title="${PODCAST_FAVORITO_TITLE}"
                                                data-favorito="true"
                                        />
                                    </div>
                                </div>
                        `
                        )
                        .join("")}
                </div>
            </section>
        </main>
    `;

    const itensFavoritos = document.querySelectorAll(".star-icon");
    itensFavoritos.forEach((item) => {
        item.addEventListener("click", async (event) => {
            const podcastId = event.target.dataset.id;
            const isFavorito = event.target.dataset.favorito === "true";

            if (isFavorito) {
                await removerPodcast(podcastId);
            } else {
                await adicionarPodcast(podcastId);
            }
        });
    });

    const importarPodcastForm = document.getElementById(
        "importar-podcast-form"
    );
    importarPodcastForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        await importarPodcast();
    });
};
