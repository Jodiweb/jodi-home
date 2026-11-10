(() => {
  "use strict";

  const config = window.JODI_WORKSHOP || {};
  const measurementId = "G-CCKT8JLL4V"; // Mesma propriedade GA4 do site institucional.
  function validUrl(value, allowLocal = false) {
    if (!value || typeof value !== "string") return null;
    try {
      const url = allowLocal
        ? new URL(value, window.location.origin)
        : new URL(value);
      if (
        url.protocol === "https:" ||
        (allowLocal && value.startsWith("/") && !value.startsWith("//"))
      )
        return url;
    } catch {
      /* Configuração pendente ou inválida: manter a inscrição indisponível. */
    }
    return null;
  }

  document.querySelectorAll("[data-value]").forEach((element) => {
    const value = config[element.dataset.value];
    if (typeof value === "string" && value.trim()) element.textContent = value;
  });
  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  function track(name, parameters = {}) {
    window.gtag?.("event", name, { send_to: measurementId, ...parameters });
  }
  track("view_workshop_page");

  const registration = validUrl(config.registrationUrl);
  if (registration && config.registrationAcceptsUtm) {
    // Mantém a URL de entrada intacta e transfere somente parâmetros de campanha.
    new URLSearchParams(window.location.search).forEach((value, key) => {
      if (/^utm_[a-z0-9_]+$/i.test(key) && !registration.searchParams.has(key))
        registration.searchParams.set(key, value);
    });
  }

  const registrationDialog = document.querySelector(".registration-dialog");
  const registrationTemplate = document.querySelector("#registration-template");
  const registrationFrame = registrationTemplate.content.querySelector("iframe");
  const canEmbedRegistration =
    typeof registrationDialog.showModal === "function" &&
    registration?.origin === "https://api.leadconnectorhq.com" &&
    registration.pathname === `/widget/form/${registrationFrame.dataset.formId}`;

  function prepareRegistration() {
    const form = registrationDialog.querySelector(".registration-form");
    if (form.firstElementChild) return;
    registrationDialog.querySelector(".registration-direct").href = registration.href;
    const iframe = registrationFrame.cloneNode();
    iframe.src = registration.href;
    form.append(iframe);
  }

  let embedRequested = false;
  function openRegistration() {
    registrationDialog.showModal();
    prepareRegistration();
    if (embedRequested) return;
    embedRequested = true;
    const embedScript = document.createElement("script");
    embedScript.src = "https://link.msgsndr.com/js/form_embed.js";
    document.body.append(embedScript);
  }

  if (canEmbedRegistration) {
    // Antecipa o carregamento do formulário sem atrasar o conteúdo da página.
    if (document.readyState === "complete") prepareRegistration();
    else window.addEventListener("load", prepareRegistration, { once: true });

    if (!("closedBy" in registrationDialog)) {
      registrationDialog.addEventListener("click", (event) => {
        if (event.target !== registrationDialog) return;
        const { left, right, top, bottom } = registrationDialog.getBoundingClientRect();
        if (event.clientX < left || event.clientX >= right ||
            event.clientY < top || event.clientY >= bottom) {
          registrationDialog.close();
        }
      });
    }
  }

  document.querySelectorAll("[data-checkout]").forEach((link) => {
    if (!registration) return;
    link.href = registration.href;
    link.removeAttribute("aria-disabled");
    link.removeAttribute("role");
    if (canEmbedRegistration) link.setAttribute("aria-haspopup", "dialog");
    link.addEventListener("click", (event) => {
      // Nome preservado para manter a série existente no GA4.
      track("click_workshop_checkout", {
        cta_position: link.dataset.checkout,
        transport_type: "beacon",
      });
      if (
        canEmbedRegistration && !event.defaultPrevented &&
        !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey
      ) {
        event.preventDefault();
        openRegistration();
      }
    });
    // Inclui abertura por botão central sem duplicar o clique normal.
    link.addEventListener("auxclick", (event) => {
      if (event.button === 1)
        track("click_workshop_checkout", {
          cta_position: link.dataset.checkout,
          transport_type: "beacon",
        });
    });
  });
  let legalCount = 0;
  document.querySelectorAll("[data-legal]").forEach((link) => {
    const url = validUrl(config[`${link.dataset.legal}Url`], true);
    if (!url) return;
    link.href = url.href;
    link.hidden = false;
    legalCount++;
  });
  document.querySelector("[data-legal-pending]").hidden = legalCount === 2;
})();
