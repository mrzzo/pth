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

    if (!url) return null;

    return normalizeUrl(url);
}

document.addEventListener("DOMContentLoaded", () => {

    const REDIRECT_ENABLED = true;
    if (TIMEOUT_SECONDS <= 0) {
    window.location.href = redirectUrl;
    return;
}
    const TIMEOUT_SECONDS = 0;

    if (!window.PathUI) {
        console.error("PathUI não carregado");
        return;
    }


    const slug = getSlug();

const redirectUrl = getRedirectUrl(slug);
    

    if (!redirectUrl || !REDIRECT_ENABLED) {

        document.title = "Destino não encontrado";

        PathUI.setMessage("Destino inexistente.");

        PathUI.dimLoader();

        return;
    }

    let timeLeft = TIMEOUT_SECONDS;
    let cancelled = false;

    PathUI.setDestination(redirectUrl);

    const update = () => {

        document.title = `Redirecionando em ${timeLeft}...`;

        PathUI.setMessage(
            `Redirecionando em ${timeLeft} segundos...`
        );

    };

    update();

    const interval = setInterval(() => {

        if (cancelled) return;

        timeLeft--;

        update();

        if (timeLeft <= 0) {

            clearInterval(interval);

            window.location.href = redirectUrl;

        }

    },1000);


    PathUI.onCancel(()=>{

        cancelled=true;

        clearInterval(interval);

        document.title="Redirecionamento cancelado";

        PathUI.setMessage("Redirecionamento cancelado.");

        PathUI.dimLoader();

    });

    PathUI.onGo(()=>{

        window.location.href=redirectUrl;

    });

});