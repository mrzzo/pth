document.addEventListener("DOMContentLoaded", () => {

  // =====================
  // UTIL
  // =====================
  const formatUrl = (url) => {
    try {
      const u = new URL(url);
      const path = u.pathname.length > 40 ? u.pathname.slice(0, 40) + "…" : u.pathname;
      return `${u.hostname}${path}`;
    } catch {
      return url;
    }
  };

  // =====================
  // BASE VISUAL
  // =====================
  document.body.style.margin = "0";
  document.body.style.fontFamily = "system-ui, -apple-system, sans-serif";
  document.body.style.background = "#0e0e10";
  document.body.style.color = "#ffffff";

  const container = document.createElement("div");
  container.style.minHeight = "100vh";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.justifyContent = "center";
  container.style.alignItems = "center";
  container.style.gap = "14px";

  const logo = document.createElement("div");
  logo.innerText = ":Path";
  logo.style.fontSize = "2.2rem";
  logo.style.fontWeight = "600";

  const loaderWrapper = document.createElement("div");
  loaderWrapper.style.width = "160px";
  loaderWrapper.style.height = "3px";
  loaderWrapper.style.background = "rgba(255,255,255,0.15)";
  loaderWrapper.style.borderRadius = "999px";
  loaderWrapper.style.overflow = "hidden";

  const loaderLine = document.createElement("div");
  loaderLine.style.width = "40%";
  loaderLine.style.height = "100%";
  loaderLine.style.background = "#fff";
  loaderLine.style.animation = "loading 1.2s ease-in-out infinite";
  loaderWrapper.appendChild(loaderLine);

  const message = document.createElement("p");
  message.style.opacity = "0.8";
  message.style.margin = "0";

  const destination = document.createElement("div");
  destination.style.fontSize = "0.75rem";
  destination.style.opacity = "0.45";
  destination.style.maxWidth = "260px";
  destination.style.textAlign = "center";
  destination.style.wordBreak = "break-all";

  // =====================
  // BOTÕES
  // =====================
  const actions = document.createElement("div");
  actions.style.display = "flex";
  actions.style.gap = "12px";
  actions.style.marginTop = "12px";

  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancelar";

  const goBtn = document.createElement("button");
  goBtn.innerText = "Avançar";

  [cancelBtn, goBtn].forEach(btn => {
    btn.style.padding = "8px 16px";
    btn.style.borderRadius = "999px";
    btn.style.border = "1px solid rgba(255,255,255,0.25)";
    btn.style.background = "transparent";
    btn.style.color = "#fff";
    btn.style.cursor = "pointer";
  });

  actions.appendChild(cancelBtn);
  actions.appendChild(goBtn);

  container.append(logo, loaderWrapper, message, destination, actions);
  document.body.appendChild(container);

  // =====================
  // CSS
  // =====================
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes loading {
      0% { transform: translateX(-100%); }
      50% { transform: translateX(150%); }
      100% { transform: translateX(150%); }
    }
  `;
  document.head.appendChild(style);

  // =====================
  // API PÚBLICA
  // =====================
  window.PathUI = {
    setMessage(text) {
      message.innerText = text;
    },
    setDestination(url) {
      destination.innerText = formatUrl(url);
    },
    dimLoader() {
      loaderLine.style.opacity = "0.3";
      destination.style.opacity = "0.4";
    },
    onCancel(cb) {
      cancelBtn.onclick = cb;
    },
    onGo(cb) {
      goBtn.onclick = cb;
    }
  };

});
