document.addEventListener("DOMContentLoaded", () => {

  const REDIRECT_ENABLED = true;
  const TIMEOUT_SECONDS = 3;

  const monthRoutes = {
    jan: "https://www.notion.so/JANEIRO-2df1b43e1e8c800d83d8c7d260a22607?source=copy_link",
    fev: "https://www.notion.so/FEVEREIRO-2df1b43e1e8c801ba0c5c686a2b3f459?source=copy_link",
    mar: "https://www.notion.so/MAR-O-2df1b43e1e8c80a2ba7ef5c7bb7ac668?source=copy_link",
    abr: "https://www.notion.so/ABRIL-2df1b43e1e8c80f19083e011c734b3ca?source=copy_link",
    mai: "https://www.notion.so/MAIO-2df1b43e1e8c80818cebeee415e2071e?source=copy_link",
    jun: "https://www.notion.so/JUNHO-2df1b43e1e8c80b3a504cc3e738abb89?source=copy_link",
    jul: "https://www.notion.so/JULHO-2df1b43e1e8c8066b805ce385f396c3b?source=copy_link",
    ago: "https://www.notion.so/AGOSTO-2e71b43e1e8c80c1b38ee8f425ce14a1?source=copy_link",
    set: "https://www.notion.so/SETEMBRO-2e71b43e1e8c8041a78ae6ccb819c082?source=copy_link",
    out: "https://www.notion.so/OUTUBRO-2e71b43e1e8c8041a472de7d18eaafe8?source=copy_link",
    nov: "https://www.notion.so/NOVEMBRO-2e71b43e1e8c809da859e51441965a0a?source=copy_link",
    dez: "https://www.notion.so/DEZEMBRO-2e71b43e1e8c805d84b9d01bef16798a?source=copy_link"
  };

  const query = window.location.search.replace("?", "").toLowerCase();
  const redirectUrl = monthRoutes[query]; //?jan

  if (!window.PathUI) {
    console.error("PathUI não carregado");
    return;
  }

  if (!redirectUrl || !REDIRECT_ENABLED) {
    document.title = "Redirecionamento indisponível";
    PathUI.setMessage("Destino inválido ou inexistente.");
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
    window.location.href = redirectUrl;
  });

});
