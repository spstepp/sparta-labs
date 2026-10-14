(function () {
  var TO = "spartalabs@mail.grokbot.com";
  function build(f) {
    var product = f.product.value;
    var q = f.querySelector('input[name="quote"]:checked');
    var body = [
      "Product: " + product,
      "",
      "What's working:",
      f.working.value.trim() || "(blank)",
      "",
      "What to improve or add:",
      f.improve.value.trim() || "(blank)",
      "",
      "Email for follow-up: " + (f.email.value.trim() || "(none)"),
      "May we quote your feedback?: " + (q ? q.value : "No")
    ].join("\r\n");
    var subject = "Feedback: " + product;
    return { subject: subject, body: body,
      href: "mailto:" + TO + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body) };
  }
  window.sparta_buildFeedback = build;
  var f = document.getElementById("fb");
  if (!f) return;
  var err = document.getElementById("err"), status = document.getElementById("status");
  function valid() {
    var ok = !!f.product.value;
    err.hidden = ok;
    if (!ok) f.product.focus();
    return ok;
  }
  f.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!valid()) return;
    window.location.href = build(f).href;
    status.textContent = "Your email app should open now. If it didn't, use Copy my answers.";
  });
  document.getElementById("copy").addEventListener("click", function () {
    if (!valid()) return;
    var m = build(f), text = "To: " + TO + "\nSubject: " + m.subject + "\n\n" + m.body.replace(/\r\n/g, "\n");
    function done() { status.textContent = "Copied. Paste it into an email to " + TO + "."; }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fallback);
    } else fallback();
    function fallback() {
      var t = document.createElement("textarea"); t.value = text; t.setAttribute("readonly", "");
      t.style.position = "fixed"; t.style.opacity = "0"; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); done(); } catch (x) { status.textContent = "Copy failed. Select and copy your answers manually."; }
      document.body.removeChild(t);
    }
  });
})();
