import { WorkerChangeMessage, WorkerMessageType, WorkerMessageChangeType, WorkerCacheMessage } from "../sw/types"
import { logger } from "./client/logger"

type Hook<Entity> = { [databaseAndStore: string]: (entity: Entity) => void }

class ServiceWorkerClient {
  private isCompatible: boolean = "serviceWorker" in navigator
  private changesHooks: Hook<any> = {}

  constructor() {
    if(this.isCompatible) {
      navigator.serviceWorker.onmessage = (event: any) => {
        if(event.data.type === WorkerMessageType.CACHE) {
          this.onCacheMessage(event.data)
        } else if(event.data.type === WorkerMessageType.CHANGE) {
          this.onChangeMessage(event.data)
        }
      }

      if("caches" in window) {
        navigator.serviceWorker.oncontrollerchange = () => {
          logger.logSuccess("ServiceWorker", "Changed controller")
          caches.open("offline").then(cache => {
            cache.keys().then(keys => {
              if(keys.length === 0) {
                this.forceCacheUpdate()
              }
            })
          })
        }
      }
    }

    this.load()
  }

  load() {
    if(this.isCompatible) {
      navigator.serviceWorker.register(`/${(window as any).kiwi.sw}`, {
        scope: window.location.origin,
      }).then(() => {
        navigator.serviceWorker.ready.then(() => {
          logger.logSuccess("ServiceWorker", "Loaded")
        })
      })
    }
  }

  forceCacheUpdate() {
    const scripts: string[] = []
    document.querySelectorAll("script").forEach(script => {
      if(script.src.length !== 0) scripts.push(script.src)
    })
    this.postMessage<WorkerCacheMessage>({
      type: WorkerMessageType.CACHE,
      scripts,
    })
  }

  private postMessage<Type>(message: Type) {
    const controller = navigator.serviceWorker.controller
    if(controller !== null) {
      return controller.postMessage(message)
    } else {
      return null
    }
  }

  private onCacheMessage(message: WorkerCacheMessage) {
    if(typeof (module as any).hot === "undefined") {
      window.location.reload() // TODO : soft reload
    }
  }

  private onChangeMessage(message: WorkerChangeMessage) {
    const hook = this.changesHooks[`${message.database}-${message.store}`]
    if(typeof hook !== "undefined") hook(message.entity)
  }

  propagateChanges<Entity>(type: WorkerMessageChangeType, databaseName: string, storeName: string, entity: Entity) {
    this.postMessage<WorkerChangeMessage>({
      type: WorkerMessageType.CHANGE,
      change: type,
      database: databaseName,
      store: storeName,
      entity,
    })
  }

  addChangesHook<Entity>(database: string, store: string, action: (entity: Entity) => void) {
    this.changesHooks[`${database}-${store}`] = action
  }

}

// export const serviceWorkerClient = new ServiceWorkerClient() // TODO : disabled
