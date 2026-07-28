function getSlug() {
    return window.location.search
        .substring(1)
        .trim();
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
    const TIMEOUT_SECONDS = 0;

    if (!window.PathUI) {
        console.error("PathUI não carregado");
        return;
    }

    const slug = getSlug();
    const redirectUrl = getRedirectUrl(slug);

    if (!REDIRECT_ENABLED || !redirectUrl) {
        document.title = "Destino não encontrado";
        PathUI.setMessage("Destino inexistente.");
        PathUI.dimLoader();
        return;
    }

    PathUI.setDestination(redirectUrl);

    // Redirecionamento imediato
    if (TIMEOUT_SECONDS <= 0) {
        window.location.href = redirectUrl;
        return;
    }

    let timeLeft = TIMEOUT_SECONDS;
    let cancelled = false;

    function update() {
        document.title = `Redirecionando em ${timeLeft}...`;

        PathUI.setMessage(
            `Redirecionando em ${timeLeft} segundo${timeLeft === 1 ? "" : "s"}...`
        );
    }

    update();

    const interval = setInterval(() => {

        if (cancelled) return;

        timeLeft--;

        update();

        if (timeLeft <= 0) {
            clearInterval(interval);
            window.location.href = redirectUrl;
        }

    }, 1000);

    PathUI.onCancel(() => {

        cancelled = true;
        clearInterval(interval);

        document.title = "Redirecionamento cancelado";
        PathUI.setMessage("Redirecionamento cancelado.");
        PathUI.dimLoader();

    });

    PathUI.onGo(() => {

        clearInterval(interval);
        window.location.href = redirectUrl;

    });

});