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


async function getRedirectUrl(slug){

    const routes = await loadRoutes();

    const url = routes[slug];

    return url ? normalizeUrl(url) : null;

}

async function loadRoutes(){

    const response = await fetch(
        ROUTES_SHEET + "&t=" + Date.now()
    );

    const csv = await response.text();

    return csv;
}


document.addEventListener("DOMContentLoaded", async () => {

    const slug = getSlug();

    const redirectUrl = await getRedirectUrl(slug);


    if(!redirectUrl){

        document.title = "Destino não encontrado";

        console.error(
            "Rota inexistente:",
            slug
        );

        return;
    }


    window.location.replace(redirectUrl);

});