function share() {
  const canonical = document.querySelector("link[rel=canonical]");
  const url = canonical ? canonical.href : window.location.href;

  const metaText = document.querySelector('meta[name="share-text"]');
  const text = metaText ? metaText.content : "Veja isso:";

  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: text,
      url: url
    });
  } else {
    alert("Compartilhamento não suportado");
  }
}