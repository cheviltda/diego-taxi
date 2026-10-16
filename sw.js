const CACHE='diego-taxi-v47-backup';
const ASSETS=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(ASSETS);await self.skipWaiting()})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith((async()=>{try{const response=await fetch(event.request);if(response&&response.ok){const cache=await caches.open(CACHE);cache.put(event.request,response.clone())}return response}catch(e){const cached=await caches.match(event.request);if(cached)return cached;throw e}})())});
