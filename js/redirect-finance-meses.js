document.addEventListener("DOMContentLoaded", () => {

  const REDIRECT_ENABLED = true;
  const TIMEOUT_SECONDS = 3;
  const VALID_YEAR = 2026; // ano que você quer que funcione

  const monthRoutes = {
    0: "", // jan
    1: "",
    2: "",
    3: "",
    4: "https://docs.google.com/spreadsheets/d/1SvWtGoZkXNNVIlg3iWiMsySCdjp72OEJsk9uQs8zalQ/edit?gid=239692972#gid=239692972",
    5: "https://seusite.com/junho",
    6: "https://seusite.com/julho",
    7: "https://seusite.com/agosto",
    8: "https://seusite.com/setembro",
    9: "https://seusite.com/outubro",
    10: "https://seusite.com/novembro",
    11: "https://seusite.com/dezembro"
  };

  const HUB_URL = "https://docs.google.com/spreadsheets/d/1SvWtGoZkXNNVIlg3iWiMsySCdjp72OEJsk9uQs8zalQ/edit?gid=0#gid=0";

  if (!window.PathUI) {
    console.error("PathUI não carregado");
    return;
  }

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  let redirectUrl;

  // 🔥 regra principal
  if (currentYear !== VALID_YEAR) {
    redirectUrl = HUB_URL;
  } else {
    redirectUrl = monthRoutes[currentMonth];
  }

  if (!redirectUrl || !REDIRECT_ENABLED) {
    document.title = "Redirecionamento indisponível";
    PathUI.setMessage("Destino inválido.");
    PathUI.dimLoader();
    return;
  }

  let timeLeft = TIMEOUT_SECONDS;
  let cancelled = false;

  PathUI.setDestination(redirectUrl);

  const update = () => {
    document.title = `Redirecionando em ${timeLeft}...`;
    PathUI.setMessage(`Redirecionando em ${timeLeft} segundos…`);
  };

  update();

  const interval = setInterval(() => {
    if (cancelled) return;

    timeLeft--;
    update();

    if (timeLeft <= 0) {
      clearInterval(interval);
      window.location.replace(redirectUrl);
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
    window.location.replace(redirectUrl);
  });

});
