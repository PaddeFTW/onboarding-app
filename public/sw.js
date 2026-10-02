self.addEventListener("install", (event) => {
  event.waitUntil(caches.open("onboarding-v1").then((cache) => cache.addAll(["/", "/login"])));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
