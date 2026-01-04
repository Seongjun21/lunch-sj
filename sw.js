const CACHE   = 'lunch-sj-v1';
const ASSETS  = [
  './',
  './index.html',
  './manifest.json',
  './Lunch menu-icon.png',
  './Sun nail-image.png',
  'https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js'
];

/* ① 설치 : 필수 정적 리소스 캐싱 */
self.addEventListener('install', e =>
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)))
);

/* ② 활성화 : 이전 캐시 정리 */
self.addEventListener('activate', e =>
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
);

/* ③ 요청 가로채기 : 캐시 우선, 없으면 네트워크 */
self.addEventListener('fetch', e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)))
);
