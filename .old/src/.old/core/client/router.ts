import { createBrowserHistory } from "history"
import { regexParameter } from "../utils"

export class Router {
  static history = createBrowserHistory()

  getStringParams(prefix?: string | string[]): string[] {
    if(Array.isArray(prefix)) prefix = prefix.join("|")
    const matches = window.location.href.match(regexParameter(prefix))
    if(matches === null) return []
    return matches.map(match => match.slice(1))
  }

  getParamsObject(prefix?: string | string[]): { [key: string]: string[] } {
    let params: any = {}

    this.getStringParams(prefix).forEach(match => {
      const split = match.split(/=(.+)/)
      const key = split[0]
      const values = split[1].split("|")

      if(typeof params[key] === "undefined") params[key] = []
      params[key] = params[key].concat(values)
    })

    return params
  }

  getParamsArray(prefix?: string | string[]): { key: string, values: string[] }[] {
    let params: any = []
    let indexes: any = {}

    this.getStringParams(prefix).forEach(match => {
      const split = match.split(/=(.+)/)
      const key = split[0]
      const values = split[1].split("|")

      if(typeof indexes[key] === "undefined") {
        indexes[key] = params.length
        params.push({ key, values })
      } else {
        params[indexes[key]].values = params[indexes[key]].values.concat(values)
      }
    })

    return params
  }

}
