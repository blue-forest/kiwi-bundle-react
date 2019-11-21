import { WorkerMessageType } from "./types"
import { getSplitedPath, isRessourceAccepted, log, cleanCache } from "./utils"

declare var self: any

const onCacheMessage = (event: any) => {
  return caches.open("offline").then(cache => {

    // Main assets
    cache.addAll([
      "/",
      "/static/icons/favicon.ico",
      "/static/icons/manifest.json",
    ])

    // JS scripts
    event.data.scripts.forEach((file: string) => {
      const split = getSplitedPath(file)
      if(isRessourceAccepted(split)) {
        log("message - force cache", file)
        cache.add(file).then(() => {
          cleanCache(cache, split)
        })
      }
    })

  })
}

const onChangeMessage = (event: any) => {
  // Echo messages for all clients (except the emitter)
  return self.clients.matchAll().then((clients: any) => {
    clients.forEach((client: any) => {
      if(client.id !== event.source.id) {
        client.postMessage(event.data)
      }
    })
    log("message - change")
  })
}

export default (event: any) => {
  if(event.data.type === WorkerMessageType.CACHE) {
    event.waitUntil(onCacheMessage(event))
  } else if(event.data.type === WorkerMessageType.CHANGE) {
    event.waitUntil(onChangeMessage(event))
  }
}
