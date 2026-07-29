const ROUTES_SHEET =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vS6QkrrX5c5b-89hg3ngpP2uvOV6S3NQriQGCf7JptmVBp70wx-ravaXRvO-Q96biDKHl_0qWdv5KWk/pub?gid=140030167&single=true&output=csv";



async function loadRoutes(){

    const response = await fetch(ROUTES_SHEET);

    const csv = await response.text();

    const lines = csv.split("\n");

    const routes = {};


    lines.slice(1).forEach(line => {

        const [
            slug,
            url,
            ativo
        ] = line.split(",");


        if(
            slug &&
            url &&
            ativo?.trim() === "sim"
        ){

            routes[slug.trim()] = url.trim();

        }

    });


    return routes;
}