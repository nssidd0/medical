/**
 * NS SIDD TUTORIAL - Service Worker for Heera Medical
 * Version: 1.0.0
 */

const CACHE_NAME = 'heera-medical-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://i.gifer.com/ZZ5H.gif'
];

// 1. Install Event: Files ko cache mein save karna
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache for Heera Medical');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Service worker is required for PWA installation
});

// 2. Fetch Event: Offline ya slow network pe cached files dikhana
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Agar cache mein hai to wahi dikhao, nahi to network se lao
        return response || fetch(event.request);
      })
  );
});

// 3. Activate Event: Purana cache clear karna (Jab aap update karenge)
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

});
