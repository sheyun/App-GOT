

const version = new Date().getTime();
const cachePrefix = 'reg_form';
const staticCacheName = `${cachePrefix}static-${version}`;
const expectedCaches = [staticCacheName];

addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(staticCacheName);

    await cache.addAll([
      './',
      './index.html',
      './css/bootstrap.min.css',
      './css/style.css',
      './css/got.css',
      './imgs/bg.jpg'
      
    ]);

    self.skipWaiting();
  })());
});

addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const cacheName of await caches.keys()) {
      if (!cacheName.startsWith(cachePrefix)) continue;
      if (!expectedCaches.includes(cacheName)) await caches.delete(cacheName);
    }
  })());
});

// addEventListener('fetch', event => {
//   const url = new URL(event.request.url);
//   event.respondWith(
//     caches.match(event.request).then(r => r || fetch(event.request))
//   );
// });

addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(function(cachedFiles) {
        if(cachedFiles) {
            return cachedFiles;
        } else {
            return fetch(event.request);
        }
    })
  );
});