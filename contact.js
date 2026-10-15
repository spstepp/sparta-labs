/* Builds the contact email address in the browser so it is never written out in the page source.
   Text is assembled shortly after the page loads; the mailto link is armed on hover, focus, touch or click. */
(function () {
  var u = "aGVsbG8=", d = ["c3BhcnRh", "c2l0ZQ=="], t = "moc";
  function address() {
    return atob(u) + String.fromCharCode(64) + atob(d[0]) + atob(d[1]) + String.fromCharCode(46) + t.split("").reverse().join("");
  }
  window.SpartaContact = { address: address };

  function show() {
    var spots = document.querySelectorAll("[data-contact]");
    for (var i = 0; i < spots.length; i++) {
      var s = spots[i];
      if (s.getAttribute("data-contact-ready")) continue;
      var a = document.createElement("a");
      a.setAttribute("href", "#");
      a.setAttribute("data-contact-link", "");
      a.textContent = address();
      s.textContent = "";
      s.appendChild(a);
      s.setAttribute("data-contact-ready", "1");
    }
  }
  function arm(a) { a.setAttribute("href", "mailto:" + address()); }
  function onEvent(e) {
    var a = e.target && e.target.closest ? e.target.closest("a[data-contact-link]") : null;
    if (a) arm(a);
  }
  ["pointerover", "pointerdown", "touchstart", "focusin", "contextmenu", "click"].forEach(function (n) {
    document.addEventListener(n, onEvent, true);
  });
  function start() { setTimeout(show, 300); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
