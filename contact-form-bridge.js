(function () {
  "use strict";

  if (window.JODI_PONTE_V3) return;

  const IDS = [
    "tBZgf0rkKpyZ0Bs05flY",
    "zJsileeq1omVv1smrgsZ"
  ];

  const ORIGENS = [
    "https://api.leadconnectorhq.com",
    "https://link.msgsndr.com"
  ];

  const CHAVE = "JODI_DADOS_FORM";

  // Evita reutilizar dados de um cadastro anterior.
  try {
    sessionStorage.removeItem(CHAVE);
  } catch (_) {}

  const diagnostico = window.JODI_PONTE_V3 = {
    status: "aguardando_iframe",
    formulario: null,
    camposRecebidos: {
      nome: false,
      email: false,
      produto: false,
      empresa: false
    },
    erro: null
  };

  function identificarFormulario(event) {
    if (!ORIGENS.includes(event.origin)) {
      return null;
    }

    const iframes = document.querySelectorAll(
      'iframe[src*="/widget/form/"]'
    );

    for (const iframe of iframes) {
      let url;

      try {
        url = new URL(
          iframe.getAttribute("src"),
          document.baseURI
        );
      } catch (_) {
        continue;
      }

      const match = url.pathname.match(
        /^\/widget\/form\/([^/]+)\/?$/
      );

      if (!match || !IDS.includes(match[1])) {
        continue;
      }

      if (event.source === iframe.contentWindow) {
        return match[1];
      }
    }

    return null;
  }

  function limpar(valor) {
    if (typeof valor !== "string") return "";
    return valor.trim().slice(0, 500);
  }

  window.addEventListener("message", function (event) {
    const mensagem = event.data;

    if (
      !mensagem ||
      typeof mensagem !== "object" ||
      ![
        "JODI_FORM_PRONTO_V3",
        "JODI_FORM_DADOS_V3"
      ].includes(mensagem.type)
    ) return;

    const formId = identificarFormulario(event);

    if (!formId) return;

    diagnostico.formulario = formId;

    if (mensagem.type === "JODI_FORM_PRONTO_V3") {
      diagnostico.status = "iframe_conectado";
      return;
    }

    const entrada = mensagem.dados;

    if (!entrada || typeof entrada !== "object") {
      diagnostico.erro = "Dados inválidos";
      return;
    }

    let anteriores = {};

    try {
      const registro = JSON.parse(
        sessionStorage.getItem(CHAVE) || "{}"
      );
      anteriores = registro.dados || {};
    } catch (_) {}

    const dados = {};

    ["nome", "email", "produto", "empresa"].forEach(
      function (campo) {
        dados[campo] =
          limpar(entrada[campo]) ||
          limpar(anteriores[campo]);
      }
    );

    try {
      sessionStorage.setItem(
        CHAVE,
        JSON.stringify({
          salvoEm: Date.now(),
          dados: dados
        })
      );

      Object.keys(dados).forEach(function (campo) {
        diagnostico.camposRecebidos[campo] =
          Boolean(dados[campo]);
      });

      diagnostico.status =
        Object.values(
          diagnostico.camposRecebidos
        ).every(Boolean)
          ? "dados_completos"
          : "dados_parciais";

      console.info(
        "[JODI] Formulário conectado:",
        diagnostico
      );

    } catch (erro) {
      diagnostico.status = "erro";
      diagnostico.erro =
        "Não foi possível armazenar os dados.";
    }
  });

  // Aproveita a localização do script original.
  function salvarGeo() {
    const geo = window.JODI_GEO &&
      window.JODI_GEO.localizacao;

    if (!geo) return false;

    try {
      sessionStorage.setItem(
        "JODI_GEO_SALVO",
        JSON.stringify(geo)
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  if (!salvarGeo()) {
    const intervalo = setInterval(function () {
      if (salvarGeo()) {
        clearInterval(intervalo);
      }
    }, 250);

    setTimeout(function () {
      clearInterval(intervalo);
    }, 8000);
  }

  window.addEventListener("pagehide", salvarGeo);

  console.info(
    "[JODI] Ponte V3 iniciada."
  );
})();
