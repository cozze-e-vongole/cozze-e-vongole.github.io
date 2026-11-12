// Service worker minimo: serve solo a rendere il sito installabile.
// Non salva niente in cache: le pagine arrivano sempre fresche dalla rete.
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", function (e) {
  if (e.request.mode !== "navigate") return;
  e.respondWith(fetch(e.request).catch(function () {
    return new Response("<h1 style='font-family:sans-serif'>Sei offline</h1><p style='font-family:sans-serif'>Riprova quando torna la connessione.</p>",
      { headers: { "Content-Type": "text/html; charset=utf-8" } });
  }));
});
