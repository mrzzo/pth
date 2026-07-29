function getSlug() {
    return window.location.search
        .substring(1)
        .trim()
        .split("&")[0];
}

function getOptions() {

    const params = window.location.search
        .substring(1)
        .split("&")
        .slice(1);

    return {
        block: params.includes("block"),
        preview: params.includes("preview"),
        debug: params.includes("debug"),
        delay: Number(
            params.find(p => p.startsWith("delay="))
                ?.split("=")[1]
        ) || 0
    };

}

function normalizeUrl(url) {

    return /^https?:\/\//i.test(url)
        ? url
        : `https://${url}`;

}

function getRedirectUrl(slug) {

    const url = ROUTES[slug];

    return url ? normalizeUrl(url) : null;

}

document.addEventListener("DOMContentLoaded", () => {

    const REDIRECT_ENABLED = true;

    if (!REDIRECT_ENABLED) {

        document.title = "Redirecionamento desativado";
        return;

    }

    const slug = getSlug();
    const options = getOptions();
    const redirectUrl = getRedirectUrl(slug);

    //console.log("Slug:", slug);
    //console.log("Redirect:", redirectUrl);

    if (!redirectUrl) {

        document.title = "Destino não encontrado";

        console.error(`Slug "${slug}" não encontrado.`);

        return;

    }

    if (options.debug) {

        console.group("PATH DEBUG");

        console.log("Slug:", slug);
        console.log("Destino:", redirectUrl);
        console.log("Opções:", options);

        console.groupEnd();

    }

    if (options.preview || options.block) {

        document.body.innerHTML = `
            <h1>Modo de teste</h1>

            <p><b>Slug:</b> ${slug}</p>

            <p><b>Destino:</b></p>

            <a href="${redirectUrl}" target="_blank">
                ${redirectUrl}
            </a>

            <hr>

            <button id="go">
                Ir agora
            </button>
        `;

        document
            .getElementById("go")
            .onclick = () => window.location.replace(redirectUrl);

        return;

    }

    if (options.delay > 0) {

        document.body.innerHTML =
            `<h2>Redirecionando em ${options.delay}s...</h2>`;

        setTimeout(() => {

            window.location.replace(redirectUrl);

        }, options.delay * 1000);

        return;

    }

    window.location.replace(redirectUrl);

});