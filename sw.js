// Change VERSION when publishing any app asset. Updates activate on request.
const VERSION = '20261023-pwa2';
const PREFIX = 'aventure-des-sons-';
const CACHE = PREFIX + VERSION;
const ASSETS = [
  "./",
  "index.html",
  "style.css?v=20261021-2146",
  "game-theme.css?v=20261022-keypad1",
  "app.js?v=20261022-resetfix2",
  "preview.js?v=20261021-2159",
  "bonus.js?v=20261021-2159",
  "sound-recorder.js?v=1",
  "pwa.js",
  "manifest.webmanifest",
  "assets/audio/ai.wav",
  "assets/audio/an.wav",
  "assets/audio/ch.wav",
  "assets/audio/eau.wav",
  "assets/audio/ei.wav",
  "assets/audio/en.wav",
  "assets/audio/gn.wav",
  "assets/audio/in.wav",
  "assets/audio/oi.wav",
  "assets/audio/oin.wav",
  "assets/audio/on.wav",
  "assets/audio/ou.wav",
  "assets/audio/oui.wav",
  "assets/audio/ouin.wav",
  "assets/illustration-01.webp",
  "assets/illustration-02.webp",
  "assets/illustration-03.webp",
  "assets/illustration-04.webp",
  "assets/illustration-05.webp",
  "assets/illustration-06.webp",
  "assets/illustration-07.webp",
  "assets/illustration-08.webp",
  "assets/illustration-09.webp",
  "assets/illustration-10.jpg",
  "assets/illustration-11.jpg",
  "assets/illustration-12.jpg",
  "assets/illustration-13.jpg",
  "assets/illustration-14.jpg",
  "assets/illustration-15.jpg",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png"
];
const urls = ASSETS.map(p => new URL(p, self.registration.scope).href);
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(urls)));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin ||
      !url.href.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // Serve one complete app version, including HTML, until the next worker activates.
    const cached = request.mode === 'navigate'
      ? await cache.match(new URL('index.html', self.registration.scope).href)
      : await cache.match(request);
    return cached || fetch(request);
  })());
});

