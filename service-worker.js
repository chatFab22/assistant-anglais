self.addEventListener('install', e => {
  e.waitUntil(caches.open('cache').then(cache => cache.addAll([
    '/',
    '/index.html',
    '/chatbot.js',
    '/manifest.json',
    '/icon.png'
  ])));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});