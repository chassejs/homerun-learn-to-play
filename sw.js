// NOTE: /version.json is deliberately NOT precached — it is the freshness
// probe the update self-check reads, and must always come from the network.
const CACHE = 'homerun-learn-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/changelog.html',
  '/styles.css',
  '/manifest.json',
  '/version.js',
  '/versionCompat.js',
  '/uiModal.js',
  '/src/glossary-data.js',
  '/src/curriculum-data.js',
  '/src/curriculum-t1.js',
  '/src/curriculum-t2.js',
  '/src/curriculum-t3.js',
  '/src/curriculum-t4.js',
  '/src/curriculum-t5.js',
  '/src/curriculum-t6.js',
  '/src/questions-data.js',
  '/src/questions-t1.js',
  '/src/questions-t2.js',
  '/src/questions-t3.js',
  '/src/questions-t4.js',
  '/src/questions-t5.js',
  '/src/questions-t6.js',
  '/svg.js',
  '/progress.js',
  '/interactive.js',
  '/quiz.js',
  '/iq.js',
  '/placement.js',
  '/learn.js',
  '/feedback.js',
  '/changelog.js',
  '/appUpdates.js',
  '/shell.js',
  '/brand/crest.png',
  '/brand/icon-32.png',
  '/brand/icon-180.png',
  '/brand/icon-512.png',
  '/brand/icon-effort.jpg',
  '/brand/icon-respect.jpg',
  '/brand/icon-team.jpg',
  '/brand/roots-diagram.jpg',
  '/brand/diamond-golden-hour.jpg',
  '/brand/pattern-brand-tile.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
