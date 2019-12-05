import { EntityParams } from "./Entity"
import { logger } from "../client/logger"
import { serviceWorkerClient } from "../sw"
import { WorkerMessageChangeType } from "../../sw/types"

interface RepositoryParams<Entity, EntityData> {
  name: string
  version: number
  generateEntity: (params: EntityParams<EntityData>) => Entity
}

type RequestCall = (store: IDBObjectStore) => IDBRequest

type Callback<Entity> = (entity: Entity) => void

export class Repository<Entity = {}, EntityData = {}> implements RepositoryParams<Entity, EntityData> {
  name: string
  version: number
  generateEntity: (params: EntityParams<EntityData>) => Entity
  private localCallsQueue: (() => void)[] = []
  private hooksQueue: Callback<Entity>[] = []
  private swCallsQueue: any = []
  private database?: IDBDatabase

  constructor(params: RepositoryParams<Entity, EntityData>) {
    this.name = params.name
    this.version = params.version
    this.generateEntity = params.generateEntity
    logger.logInfo(this, `Loaded ${this.name} entities`)
  }

  private handleRequest(request: IDBRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        resolve(request.result)
      }
      request.onerror = () => {
        reject(request)
      }
    })
  }

  private generateRequest(database: IDBDatabase, requestCall: RequestCall) {
    const store = database.transaction(this.name, "readwrite").objectStore(this.name)
    return this.handleRequest(requestCall(store))
  }

  private execute(requestCall: RequestCall): Promise<any> {
    return new Promise(resolve => {
      if(typeof this.database !== "undefined") {
        resolve(this.generateRequest(this.database, requestCall))
      } else {
        this.localCallsQueue.push(() => {
          resolve(this.execute(requestCall))
        })
      }
    })
  }

  private propagateToServiceWorker(type: WorkerMessageChangeType, entity: Entity) {
    if(typeof this.database !== "undefined") {
      serviceWorkerClient.propagateChanges<Entity>(type, this.database.name, this.name, entity)
    } else {
      this.swCallsQueue({ type, entity })
    }
  }

  init(database: IDBDatabase) {
      // Link Repository to Database
      this.database = database

      // Handle queued local requests for IndexedDB
      this.localCallsQueue.map(execute => {
        execute()
      })

      // Handle queued Service Worker changes
      this.swCallsQueue.map((call: any) => {
        this.propagateToServiceWorker(call.type, call.entity)
      })

      // Handle queued hook to listen for new updates
      this.hooksQueue.map(hook => {
        serviceWorkerClient.addChangesHook(database.name, this.name, (entity: Entity) => {
          hook(entity)
        })
      })
  }

  findAll(): Promise<Entity[]> {
    return this.execute(store => store.index("updatedAt").getAll())
  }

  forEach(action: (entity: Entity) => any): void {
    this.findAll().then(entities => {
      entities.forEach(entity => {
        action(entity)
      })
    })
  }

  create(data: EntityData): Promise<Entity> {
    return new Promise(resolve => {
      const entity = this.generateEntity({ data })
      resolve(entity)
      this.execute(store => store.put(entity)).then(() => {
        logger.logSuccess(this, `New ${this.name} record`, entity)
        this.propagateToServiceWorker(WorkerMessageChangeType.CREATE, entity)
      }).catch(error => {
        logger.logError(this, `Record ${this.name} not saved`, error, entity)
      })

    })
  }

  watchForNewEntries(action: Callback<Entity>) {
    this.hooksQueue.push(action)
  }

}
