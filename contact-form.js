(function () {
  var iframe = document.getElementById("inline-zJsileeq1omVv1smrgsZ");
  if (!iframe) return;

  var formUrl = iframe.dataset.src;
  var loaded = false;

  function loadForm(geo) {
    if (loaded) return;
    loaded = true;

    var url = new URL(formUrl);
    ["city", "state", "country"].forEach(function (field) {
      if (geo[field]) url.searchParams.set(field, geo[field]);
    });

    iframe.src = url.toString();

    var embedScript = document.createElement("script");
    embedScript.src = "https://link.msgsndr.com/js/form_embed.js";
    document.body.appendChild(embedScript);
  }

  var timeout = window.setTimeout(function () {
    loadForm({});
  }, 1500);

  fetch("/api/geo", {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
    .then(function (response) {
      if (!response.ok) throw new Error("Geolocation unavailable");
      return response.json();
    })
    .then(function (geo) {
      window.clearTimeout(timeout);
      loadForm(geo);
    })
    .catch(function () {
      window.clearTimeout(timeout);
      loadForm({});
    });
})();
