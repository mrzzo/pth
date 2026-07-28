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

    const slug = getSlug();
    const redirectUrl = getRedirectUrl(slug);

    if (!REDIRECT_ENABLED) {
        document.title = "Redirecionamento desativado";
        return;
    }

    if (!redirectUrl) {
        document.title = "Destino não encontrado";
        console.error(`Slug "${slug}" não encontrado.`);
        return;
    }

    window.location.replace(redirectUrl);

});