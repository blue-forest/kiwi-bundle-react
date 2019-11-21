
export enum WorkerMessageType { CACHE, CHANGE }

interface WorkerMessage {
  type: WorkerMessageType,
}

export interface WorkerCacheMessage extends WorkerMessage {
  scripts?: string[]
}

export enum WorkerMessageChangeType { CREATE, UPDATE, DELETE }

export interface WorkerChangeMessage<Entity = any> extends WorkerMessage {
  change: WorkerMessageChangeType,
  database: string,
  store: string,
  entity: Entity,
}
