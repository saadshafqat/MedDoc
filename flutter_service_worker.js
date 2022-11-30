'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/animations/appointcomplete.json": "ccdb611594851182ceff9f154f8b839d",
"assets/animations/checkingdocuments.json": "53e4dfb150ed35c2332370fe231f3dff",
"assets/animations/loading.json": "89088f3f8bbca8b7d3b37f7002bb742d",
"assets/animations/loadingnew.json": "89088f3f8bbca8b7d3b37f7002bb742d",
"assets/animations/notfound.json": "4a5475e90e74d003bb05843e2d397434",
"assets/animations/rating.json": "3190d7bb459bdc7de2f498f70b59adb0",
"assets/animations/undervision.json": "c67920e9a30e3201d3c2ab536fc5e225",
"assets/AssetManifest.json": "92c0b070513ed1c72e9933301b9454e9",
"assets/assets/images/appicon.jpg": "78a4c4c0c61872761f6b8fcf553b9b4c",
"assets/assets/images/appicon.png": "b801d0f79480f3b6d1426002ada33810",
"assets/assets/images/doctorcare.png": "0baf75973747d9514361b0c683cf3b6b",
"assets/assets/images/doctors.png": "26683036005be2026f9f7d80c3fbe9a9",
"assets/assets/images/doctorslogo.png": "991e1cc50b7a0173ef3bb5f3e673dad8",
"assets/assets/images/femaledoctor.png": "527f3b52a84ab5183963585997306f75",
"assets/assets/images/femaleperson.png": "777a978fc77f5b57c9d0cbd1c2fc7ad9",
"assets/assets/images/maledoctor.png": "79242a3b9211ea65ec2d2623d80700f3",
"assets/assets/images/maleperson.png": "bad45a40fa6e153ef8d1599ba875102c",
"assets/assets/images/profilelogo.png": "b8bff44b009fa27f92fb0544f8e30a36",
"assets/assets/images/review.gif": "fa1b39cb1221560f01908df0a0a04152",
"assets/FontManifest.json": "f940b9febfdc6c77a51a5571d004617a",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "68961504e31d3ef1044d93b0c238638b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP1.ttf": "23b73ce8aefb542ee0feaedd0386845c",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP2.ttf": "56dba58d2d8093c72e03733446b2ee8b",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP3.ttf": "ab4cbfb0be90d695779ab26d52482d53",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP4.ttf": "3c6ce6ca81112ece4acc134621354b1a",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP5.ttf": "6883e94fa2e1616edc835fbfa41f8993",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP6.ttf": "989fe1d7b2e0d3b11725dc8325754981",
"assets/packages/fluentui_icons/fonts/FluentSystemIconsP7.ttf": "a27b319a179db105f2e05092d214cff1",
"assets/packages/unicons/icons/UniconsLine.ttf": "30237e159b699f845847a18d1fe0c0cc",
"assets/packages/unicons/icons/UniconsSolid.ttf": "630f8bd494e53400fa9cda3a4eb8ec10",
"assets/shaders/ink_sparkle.frag": "ae6c1fd6f6ee6ee952cde379095a8f3f",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"favicon.png": "0d9c525203adf58d0631fe9e5888f5a4",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"icons/Icon-192.png": "e22af3354304e0219c59512e3bb902cd",
"icons/Icon-512.png": "f51ad6ee845c4635206160a1b129c9e5",
"icons/Icon-maskable-192.png": "e22af3354304e0219c59512e3bb902cd",
"icons/Icon-maskable-512.png": "f51ad6ee845c4635206160a1b129c9e5",
"index.html": "fd776a44b9a38c9f779014a20e4838fe",
"/": "fd776a44b9a38c9f779014a20e4838fe",
"main.dart.js": "702093fd198ec05c305feb776ee1d6f8",
"manifest.json": "581b4fea2faf083f400486928d751fa3",
"version.json": "949236ac290a7b109e2c0857765cd6eb"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
