import { log } from "./utils"

declare var self: any

export default (event: any) => {
  event.waitUntil(self.skipWaiting())
  log("install")
}
