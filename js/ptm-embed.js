// ============================================================
// PTM Review tab: sizes the embedded ptm/index.html frame to its
// content so the host page scrolls normally (no inner scrollbar).
// ============================================================
(function () {
  const frame = document.getElementById("ptmFrame");
  if (!frame) return;
  let observer = null;
  function fit() {
    try {
      const doc = frame.contentDocument;
      if (!doc || !doc.body) return;
      frame.style.height = doc.documentElement.scrollHeight + "px";
    } catch (e) { /* cross-origin: keep the CSS fallback height */ }
  }
  frame.addEventListener("load", () => {
    fit();
    try {
      observer && observer.disconnect();
      observer = new ResizeObserver(fit);
      observer.observe(frame.contentDocument.body);
    } catch (e) {}
  });
  // the tab panel starts hidden, so re-measure when it is opened
  document.querySelectorAll('.tab-btn[data-tab="ptm"]').forEach((b) =>
    b.addEventListener("click", () => requestAnimationFrame(fit))
  );
})();
