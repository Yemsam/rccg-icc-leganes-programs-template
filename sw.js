const CACHE_NAME = "rcc-leganes-2026-v7";
const APP_SHELL = [
  "./",
  "./index.html",
  "./data/app-config.js",
  "./data/programs.csv",
  "./data/members.csv",
  "./data/authorizers.csv",
  "./data/currencies.csv",
  "./data/income-categories.csv",
  "./data/expense-categories.csv",
  "./data/report-recipients.csv",
  "./data/finance-access.csv",
  "./manifest.webmanifest",
  "./icons/Rccg_logo.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (
            response &&
            response.ok &&
            new URL(request.url).origin === self.location.origin
          ) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    }),
  );
});
