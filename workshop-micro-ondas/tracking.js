(() => {
  "use strict";

  // A prévia local mantém as filas testáveis sem enviar eventos aos serviços.
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
  function loadScript(src) {
    if (local) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.append(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", "G-CCKT8JLL4V");
  window.gtag("config", "AW-640674131");
  loadScript("https://www.googletagmanager.com/gtag/js?id=G-CCKT8JLL4V");

  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  loadScript("https://www.googletagmanager.com/gtm.js?id=GTM-T4DKLGB8");

  if (!window.fbq) {
    const pixel = function () {
      if (pixel.callMethod) pixel.callMethod.apply(pixel, arguments);
      else pixel.queue.push(arguments);
    };
    window.fbq = pixel;
    window._fbq = window._fbq || pixel;
    pixel.push = pixel;
    pixel.loaded = true;
    pixel.version = "2.0";
    pixel.queue = [];
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
  }
  window.fbq("init", "1364581961221667");
  window.fbq("track", "PageView");

  // O formulário redireciona para a confirmação após o envio.
  const navigation = performance.getEntriesByType("navigation")[0];
  if (
    document.body.classList.contains("workshop-thanks") &&
    document.referrer.startsWith("https://api.leadconnectorhq.com/") &&
    (!navigation || navigation.type === "navigate")
  ) {
    window.gtag("event", "conversion", {
      send_to: "AW-640674131/SMEKCL_nhtwZENPSv7EC",
    });
  }
})();
