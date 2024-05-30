var cacheName = "checkout";

var cacheFiles = [
  "checkoout.html",
  "icon-store-32.png",
  "icon-store-512.png",
  "petstore.webmanifest.js"
];
self.addEventListener("install", (e) => {
  console.log("[service worker] Install");
  e.waitUntill(
    caches.open(cacheName).then((cahce) => {
      console.log("[service worker] caching all the files");
      return cahce.addAll(cacheFiles);
    })
  );
});
self.addEventListener("fetch", function (e) {
  e.respondWith(
    caches.match(e.request).then(function (r) {
      return (
        r ||
        fetch(e.request).then(function (res) {
          return caches.open(cacheName).then(function (cache) {
            cache.put(e.request, res.clone());
            return res;
          });
        })
      );
    })
  );
});
