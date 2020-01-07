self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open("v1")
    .then(cache=>{
      console.log("installed");
      cache.addAll([
        '/',
        'index.html',
        'about.html',
        'staff.html',
        'contact.html',
        '/js/main.js',
        '/js/sw.js',
        '/css/about.css',
        '/css/contact.css',
        '/css/index.css',
        '/css/staff.css',
      ])
    })
  )
})

self.addEventListener('activate', e=> {

  var cacheWhitelist = 'pages-cache-v1';

  e.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) <0) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});