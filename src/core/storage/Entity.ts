import { isUndefined } from "util"
import { uniqueHash, actionWithObjectKey } from "../../utils"
// import Storage from "./Storage"

// -------------------------------------------------------------

export interface EntityParams<Data> {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  data: Data
}

export class Entity<Data = {}> implements EntityParams<Data> {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  data: Data

  constructor(params: EntityParams<Data>, empty: Data) {
    this.data = params.data

    if(typeof params !== "undefined") {
      if(typeof params.id !== "undefined") {
        this.id = params.id
      } else if(typeof this.id === "undefined") {
        this.id = uniqueHash()
      }

      if(typeof params.createdAt === "undefined") {
        const date = new Date()
        this.createdAt = date
        this.updatedAt = date
      }
    }
  }

}

export interface EntityConstructor<Entity = {}, Data = {}> {
  new(params: EntityParams<Data>): Entity
}

/*class EntityMigrationUpdates {
  constructor(from: number, to: number, action: void) {}
}

class EntityMigrations {
  version: number
  updates: EntityMigrationUpdates[]
  constructor(currentVersion: number, updates: EntityMigrationUpdates[] = []) {
    this.version = currentVersion
    this.updates = updates
  }
}

// -------------------------------------------------------------

interface EntityDescription {
  // name: EntityName
  migrations: EntityMigrations
  createInstance: (params: any) => any
}*/
