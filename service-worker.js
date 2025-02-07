const CACHE_NAME = 'fotoku-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/resume.html',
  '/services.html',
  '/skills.html',
  '/projects.html',
  '/blog.html',
  '/playfrom.html',
  '/contact.html',
  '/UU No. 19 Tahun 2002 tentang Hak Cipta.pdf',
  '/UU Nomor 28 Tahun 2014.pdf',
  '/comingson.html',
  '/3d modeling.html',
  '/mod.html',
  'aplication/ROYGAMES.gif',
  'aplication/Camera Ku.ico',
  'aplication/ecommerce.png',
  'aplication/romantis.jpg',
  'aplication/gadis.jpg',
  'aplication/Pasangan.png',
  'aplication/code.avif',
  'aplication/kursus.webp',
  'aplication/joki.jpg',
  'aplication/cooking.webp',
  'aplication/AI.jpg',
  'aplication/Whatsaap.jpg',
  'aplication/malware.jpg',
  'aplication/contact.png',
  'aplication/kursus.webp',
  'aplication/roy.png',
  'aplication/royhtml.png',
  'aplication/games termux.jpg',
  'aplication/pygamesme.png',
  'aplication/dekteftif.png',
  'aplication/termux22.jpg',
  'aplication/wuwa.jpg',
  'aplication/blue.jpg',
  'aplication/unlock.jpg',
  'aplication/wa.jpeg',
  'aplication/Capcut.jpeg',
  'aplication/spotify-hacking.png',
  'aplication/musik.webp',
  'aplication/toor.png',
  'aplication/android.png', 
  'aplication/games.png',
  'aplication/termux.png',
  'aplication/gamespyquizz.mp4',
  'aplication/geek.png',
  'aplication/2id8rnf1UaJot1ry3w0ZXbsRzaW.svg',
  'aplication/2id8Ugq0nbqsBCwns7f4FKtO8Y5.svg',
  'aplication/movie.mp4',
  'aplication/katzhin.png',
  'aplication/Valorant.mp4',
  'aplication/Honor Of Kings (1).mp4',
  'aplication/Code.mp4',
  'mod apps/mod.webp',
  'assets/projek.png',
  'assets/projek2.jpg',
  'assets/projek3.png',
  'assets/projek4.png',
  'assets/projek5.png',
  'assets/projek6.png',
  'assets/projek7.png',
  'assets/projek8.png',
  'assets/projek9.png',
  'assets/projek10.png',
  'assets/projek11.jpg',
  'assets/coming son.jpg',
  '3d asset/asset1.png',
  '3d asset/asset2.png',
  '3d asset/asset3.png',
  '3d asset/asset4.png',
  'css/utility.css',
  'js/script.js',
  'js/inpect.js',
  'js/preaload.js',
  'css/preload.css',
  'css/style.css',
  'version/3_1_optimized_2000.png',
  'version/4_optimized_2000.png',
  'version/7_optimized_2000.png',
  'version/9_optimized_2000.png',
  'version/10_optimized_2000.png',
  'version/3_1_optimized_2000.png',
  'version/4_optimized_2000.png',
  'version/7_optimized_2000.png',
  'version/9_optimized_2000.png', 
  'version/10_optimized_2000.png',      
  'version/3_1_optimized_2000.png',
  'version/4_optimized_2000.png',
  'version/7_optimized_2000.png',
  'version/9_optimized_2000.png',
  'version/10_optimized_2000.png',
  'version/tracker.jpg',
  'game_date/si.png',
  'game_date/sa.png',
  'game_date/so.png',
  'game_date/sw.png',
  'game_date/sd.png',
];

// Install event: caches the necessary files when the service worker is installed
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: intercepts network requests and serves cached files when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          // If the request is found in cache, return it
          return cachedResponse;
        }
        // If not found in cache, fetch it from the network
        return fetch(event.request);
      })
  );
});

// Activate event: cleans up old caches when a new version of the service worker is activated
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
// Install Service Worker and cache static files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

// Activate the Service Worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event to handle dynamic caching
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached content if it exists or fetch from network if not
      return cachedResponse || fetch(event.request).then(networkResponse => {
        // Cache dynamic content (like images uploaded by the user)
        if (event.request.url.endsWith('.jpg') || event.request.url.endsWith('.png')) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
          });
        }
        return networkResponse;
      });
    })
  );
});
