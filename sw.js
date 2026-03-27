// Service Worker for Tealize Website
const CACHE_VERSION = 7;
const CACHE_NAME = `tealize-v${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
  '/lag-afterword.html',
  '/manifest.json',
  '/js/i18n.js',
  '/js/app.js',
  '/js/divination.js',
  '/js/tracking.js',
  '/css/variables.css',
  '/css/base.css',
  '/css/nav.css',
  '/css/controls.css',
  '/css/visual-mode.css',
  '/css/lag-section.css',
  '/css/code-mode.css',
  '/css/light-overrides.css',
  '/css/responsive.css',
  '/img/avatar_white.jpg',
  '/img/avatar_black.jpg',
  '/img/Story_Command1.jpg',
  '/img/Story_Command2.jpg',
  '/img/Story_Command0_Station_Underground_City_Rules.jpg',
  '/img/Crossing_the_Soil.jpg',
  '/img/Friend_or_Fraud1.jpg',
  '/img/Friend_or_Fraud2.jpg',
  '/img/leonAndGod.jpg',
  '/img/littlelion.jpg'
];

// Install：單項失敗不阻塞整體
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(
        urlsToCache.map(url =>
          cache.add(url).catch(err => console.log('Cache skip:', url, err.message))
        )
      )
    )
  );
  self.skipWaiting();
});

// Activate：清除舊快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
  self.clients.claim();
});

// Fetch：快取優先，沒有就網路
self.addEventListener('fetch', event => {
  if (!event.request.url.startsWith(self.location.origin)) return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        if (!res || res.status !== 200 || res.type !== 'basic') return res;
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        return res;
      }).catch(() => {});
    })
  );
});
