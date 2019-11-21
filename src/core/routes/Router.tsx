import * as React from "react"
import { createBrowserHistory } from "history"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import { LinkAction } from "./Link"
import { Redirect } from "./Redirect"
import { Route } from "./Route"

interface RouteAuthentifier {
  unauthRedirectPathForRoute: (route: Route) => string
  currentUserHasAccessToRoute: (route: Route) => boolean
}

interface RouterOptions {
  // defaultPage?: string
  routeAuthentifier?: RouteAuthentifier
}

const HISTORY = createBrowserHistory()

const regexParameter = (prefix: string = "") => new RegExp(`(\\?|\\&)(${prefix})([^=&]*)=([^&]*)`, "g")

export class Router {
  routes: (Route|Redirect)[] = []
  options: RouterOptions

  indexes: { [name: string]: number } = {}

  constructor(routes: (Route|Redirect)[] = [], options: RouterOptions = {}) {
    this.routes = routes
    this.options = options
  }

  getLinkAction(path: string): LinkAction {
    return {
      path,
      call: () => {
        // window.location.hash = path
        HISTORY.push(path)
      }
    }
  }

  getParamsAsString(prefix?: string | string[]): string[] {
    if(Array.isArray(prefix)) prefix = prefix.join("|")
    const matches = window.location.href.match(regexParameter(prefix))
    if(matches === null) return []
    return matches.map(match => match.slice(1))
  }

  getParametersAsObject(prefix?: string | string[]): { [key: string]: string[] } {
    let params: any = {}

    this.getParamsAsString(prefix).forEach(match => {
      const split = match.split(/=(.+)/)
      const key = split[0]
      const values = split[1].split("|")

      if(typeof params[key] === "undefined") params[key] = []
      params[key] = params[key].concat(values)
    })

    return params
  }

  getParametersAsArray(prefix?: string | string[]): { key: string, values: string[] }[] {
    let params: any = []
    let indexes: any = {}

    this.getParamsAsString(prefix).forEach(match => {
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

  private getReactRoutes() {
    return this.routes.map((route: Route|Redirect, index: number) => {
      if(route instanceof Redirect) {
        return <ReactRedirect exact key={`route${index}`} to={route.path}/>
      }

      return <ReactRoute exact
        key={`route${index}`}
        path={route.path}
        render={(props) => {
          if(this.options.routeAuthentifier
            && !this.options.routeAuthentifier.currentUserHasAccessToRoute(route)) {

            return <ReactRedirect exact key={`route${index}`} to={{
              pathname: this.options.routeAuthentifier!.unauthRedirectPathForRoute(route),
              state: { unauthRedirect: true },
            }}/>
          }

          return <route.component {...props}/>
        }}
      />
    })
  }

  render() {
    // return <HashRouter>
    return <ReactRouter history={HISTORY}>
      <Switch>
        {this.getReactRoutes()}
        <ReactRedirect from="*" to="/"/>
      </Switch>
    </ReactRouter>
    // </HashRouter>
  }

}
