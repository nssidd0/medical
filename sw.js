self.addEventListener('install', (e) => {
  // Yahan maine 'v2' kar diya hai
  e.waitUntil(
    caches.open('medical-v2').then((cache) => cache.addAll([
      './index.html',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
