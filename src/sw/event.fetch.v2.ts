import { WorkerMessageType } from "./types"
import { getSplitedPath, isRessourceAccepted, log, convertRequestToRootDocument, cleanCache } from "./utils"

declare var self: any

const onNotCachedRessource = (event: any, request: Request, cache: Cache, splitedPath: string[]) => {
  const networkFetch = fetch(request)
  event.waitUntil( // Cache ressource on backgroud
    networkFetch.then(networkResponse => {
      log("onNotCachedRessource - put", request.url)
      return cache.put(request, networkResponse.clone()).then(() => {
        cleanCache(cache, splitedPath)
      })
    })
  )
  return networkFetch // Network ressource
}

const informClientIfUpdated = (original: Response, latest: Response|undefined) => {
  return new Promise(resolve => {
    if(typeof latest !== "undefined" && latest.headers.get("ETag") !== original.headers.get("ETag")) {
      self.clients.matchAll().then((clients: any) => {
        log("asked for client update")
        clients.forEach((client: any) => {
          client.postMessage({ type: WorkerMessageType.CACHE })
        })
        resolve()
      })
    } else {
      resolve()
    }
  })
}

const onCachedRessource = (event: any, request: Request, cache: Cache, cacheResponse: Response, splitedPath: string[]) => {
  event.waitUntil( // Check new version on background
    fetch(request)
      .then(networkResponse => {
        log("onCachedRessource - put", request.url)
        return cache.put(request, networkResponse.clone()).then(() => {
          return cache.match(request).then(newCacheResponse => {
            return informClientIfUpdated(cacheResponse, newCacheResponse).then(() => {
              cleanCache(cache, splitedPath)
            })
          })
        })
      })
      .catch(() => {
        log("offline mode")
      })
  )
  return cacheResponse // Cache ressource
}

const fetchResponse = (event: any, request: Request, splitedPath: string[]) => {
  return caches.open("offline").then(cache => {
    return cache.match(request).then(cacheResponse => {
      if(typeof cacheResponse === "undefined") {
        log("load - network first", request.url)
        return onNotCachedRessource(event, request, cache, splitedPath)
      } else {
        log("load - cache first", request.url)
        return onCachedRessource(event, request, cache, cacheResponse, splitedPath)
      }
    })
  })
}

export default (event: any) => {
  if(event.request.method === "GET") {
    const splitedPath = getSplitedPath(event.request.url)
    if(isRessourceAccepted(splitedPath)) {
      if(event.request.destination === "document" && splitedPath[0].length !== 0) {
        event.respondWith(fetchResponse(event, convertRequestToRootDocument(event.request), [ "" ]))
        log("fetch forward", event.request.url)
      } else {
        event.respondWith(fetchResponse(event, event.request, splitedPath))
      }
    }
  }
}
