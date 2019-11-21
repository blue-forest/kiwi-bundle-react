import eventInstallV1 from "./event.install.v1"
// import eventInstallV2 from "./event.install.v2"
import eventActivate from "./event.activate"
import eventFetchV1 from "./event.fetch.v1"
// import eventFetchV2 from "./event.fetch.v2"
import eventMessageV1 from "./event.message.v1"
// import eventMessageV2 from "./event.message.v2"

self.addEventListener("install", eventInstallV1)
self.addEventListener("activate", eventActivate)
self.addEventListener("fetch", eventFetchV1)
self.addEventListener("message", eventMessageV1)
