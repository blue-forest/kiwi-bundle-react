import { PageConstructor } from "../components"

interface RouteOptions {
  authLevels?: Array<string>
}

export class Route {
  path: string|string[]
  page: PageConstructor
  options: RouteOptions

  constructor(path: string|string[], page: PageConstructor, options: RouteOptions = {}) {
    this.path = path
    this.page = page
    this.options = options
  }
}
