import { log, getSplitedPath, isRessourceAccepted, convertRequestToRootDocument, cleanCache } from "./utils"

const fetchAndCache = (cache: Cache, request: Request, splitedPath: string[]) => {
  return fetch(request).then(networkResponse => {
    return cache.put(request, networkResponse.clone()).then(() => {
      cleanCache(cache, splitedPath)
      return cache.match(request)
    })
  })
}

const fetchDocResponse = (cache: Cache, request: Request, splitedPath: string[]) => {
  return fetch("/static/kiwi.json")
    .then(kiwiJsonResponse => { // ONLINE
      log("fetch - online", request.url)
      return kiwiJsonResponse.json().then(kiwiJson => {
        const oldETag = kiwiJson[`/${splitedPath.join("/")}`]
        return cache.match(request).then(cacheResponse => {
          if(typeof cacheResponse === "undefined" || cacheResponse.headers.get("ETag") !== oldETag) {
            return fetchAndCache(cache, request, splitedPath)
          } else {
            return cacheResponse
          }
        })
      })
    })
    .catch((error) => { // OFFLINE
      console.log("ERROR", error)
      log("fetch - offline", request.url)
      return cache.match(request)
    })
}

const fetchAssetResponse = (cache: Cache, request: Request, splitedPath: string[]) => {
  return cache.match(request).then(cacheResponse => {
    if(typeof cacheResponse === "undefined") {
      return fetchAndCache(cache, request, splitedPath)
    } else {
      return cacheResponse
    }
  })
}

export default (event: any) => {
  if(event.request.method === "GET") {
    const splitedPath = getSplitedPath(event.request.url)
    if(isRessourceAccepted(splitedPath)) {
      event.respondWith(
        caches.open("offline").then(cache => {
          if(event.request.destination === "document") { // DOCUMENT
            if(splitedPath[0].length !== 0) {
              log("fetch forward", event.request.url)
              return fetchDocResponse(cache, convertRequestToRootDocument(event.request), [ "" ])
            } else {
              return fetchDocResponse(cache, event.request, splitedPath)
            }
          } else { // SOMETHING ELSE
            return fetchAssetResponse(cache, event.request, splitedPath)
          }
        })
      )
    }
  }
}
