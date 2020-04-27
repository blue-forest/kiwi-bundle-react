import React from "react"
import { i18nSettings, KeysObject } from "dropin-recipes"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import WebFont from "webfontloader"
import { render } from "react-dom"
import { Router } from "../router"
import { Text, Link, PageConstructor } from "../components"
import { logger } from "./logger"
import { KiwiBundleReactOptions, KiwiBundleReact, KiwiBundleReactRender } from "../bundle"
import { Architect } from "./Architect"

interface KiwiBundleModule extends NodeModule {
  hot: any
}

export const onDevEnv = (callback: () => void) => {
  if(typeof (module as any).hot !== "undefined") {
    callback()
  }
}

let STARTED = false

export const Renderer = (bundle: KiwiBundleReact, routes: KeysObject<KiwiBundleReactRender>): void => {
  // i18n
  i18nSettings.setCurrentLanguageFromString(navigator.language.slice(0, 2))
  i18nSettings.setMarkdownCompiler<React.ReactElement>({
    bold: (id, children) => <span key={id} style={{ fontWeight: "bold", }} children={children}/>,
    link: (id, link, children, options) => <Link key={id} path={link} children={children} target={options.target}/>,
  })

  // Render element
  const div = document.getElementById("render")
  if(div !== null) {

    // Theme
    if(!STARTED && typeof bundle.options.theme !== "undefined") {

      // Architect
      Architect.init(bundle.options.theme)

      // Fonts
      if(typeof bundle.options.theme.fonts !== "undefined") {
        WebFont.load(bundle.options.theme.fonts)
      }

      // Main style
      if(typeof bundle.options.theme.css !== "undefined") {
        (div as any).style = Object.keys(bundle.options.theme.css).reduce((result, key) => {
          if(result.length !== 0) result += " "
          return `${result}${key}: ${(bundle.options.theme.css as any)[key]};`
        }, "")
      }

    }

    // React DOM Render
    render(<ReactRouter history={Router.history}>
      <Switch>
        {(() => Object.keys(routes).map((route, index) => {
          if(typeof routes[route] === "string") {
            return <ReactRedirect exact key={`route-${index}`} to={routes[route] as string}/>
          }
          return <ReactRoute exact
            key={`route-${index}`}
            path={route}
            render={(props) => {
              /*if(this.options.routeAuthentifier
                && !this.options.routeAuthentifier.currentUserHasAccessToRoute(route))
              {
                return <ReactRedirect exact key={`route${index}`} to={{
                  pathname: this.options.routeAuthentifier!.unauthRedirectPathForRoute(route),
                  state: { unauthRedirect: true },
                }}/>
              }*/
              const RoutePage = routes[route]
              return <RoutePage {...props}/>
            }}
          />
        }))()}
        <ReactRedirect from="*" to="/"/>
      </Switch>
    </ReactRouter>, div, () => {
      logger.logSuccess("Renderer", STARTED ? "Restarted" : "Started")
      STARTED = true
    })

  }

  // Development mode
  onDevEnv(() => {
    // Listen for updates
    const moduleCacheChildren: string[] = (require.cache as any)[0].children as any
    const clientModuleName = moduleCacheChildren[moduleCacheChildren.length - 1]
    const clientModule = require.cache[clientModuleName] as KiwiBundleModule
    if(typeof clientModule.hot !== "undefined") {
      clientModule.hot.accept()
      logger.logInfo("Hot", "Listening")
    }

    // Force Service Worker cache
    const httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", "/")
    httpRequest.send()
  })
}
