import { PageConstructor } from "../components/Page"

interface RouteOptions {
  authLevels?: Array<string>
}

export class Route {
  path: string|string[]
  component: PageConstructor
  options: RouteOptions

  constructor(path: string|string[], component: PageConstructor, options: RouteOptions = {}) {
    this.path = path
    this.component = component
    this.options = options
  }
}
