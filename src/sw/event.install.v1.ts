import { log, cleanCache, getSplitedPath } from "./utils"

declare var self: any

export default (event: any) => {
  self.skipWaiting()
  event.waitUntil(
    fetch("/static/kiwi.json")
      .then(kiwiJsonResponse => { // ONLINE
        return kiwiJsonResponse.json().then(kiwiJson => {
          return caches.open("offline").then(cache => {
            return Promise.all(Object.keys(kiwiJson).map(file => {
              return cache.add(file).then(() => {
                cleanCache(cache, file.split("/").slice(1))
              })
            }))
          })
        })
      })
      .catch(() => { // OFFLINE
        log("offline mode")
      })
  )
  log("install")
}
