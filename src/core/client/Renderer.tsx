import React from "react"
import { i18nSettings, KeysObject } from "dropin-recipes"
import { Router as ReactRouter, Switch, Route as ReactRoute, Redirect as ReactRedirect } from "react-router-dom"
import WebFont from "webfontloader"
import { render } from "react-dom"
import { Router } from "../router"
import { Text, Link, PageConstructor } from "../components"
import { logger } from "./logger"
import { KiwiBundleReactOptions } from "../bundle"
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

export const Renderer = (options: KiwiBundleReactOptions, routes: KeysObject<PageConstructor | string>): void => {
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
    if(!STARTED && typeof options.theme !== "undefined") {

      // Architect
      Architect.init(options.theme)

      // Fonts
      if(typeof options.theme.fonts !== "undefined") {
        WebFont.load(options.theme.fonts)
      }

      // Main style
      if(typeof options.theme.css !== "undefined") {
        (div as any).style = Object.keys(options.theme.css).reduce((result, key) => {
          if(result.length !== 0) result += " "
          return `${result}${key}: ${(options.theme.css as any)[key]};`
        }, "")
      }

    }

    // React DOM Render
    render(<ReactRouter history={Router.history}>
      <Switch>
        {Object.keys(routes).map(route => {
          if(typeof routes[route] === "string") {
            if(options.routes[route].indexOf(":") !== -1) {
              console.error(`The route "${options.routes[route]}" need to do not contain parameters to be redirected to "${routes[route]}"`)
              return null
            }
            return <ReactRedirect exact key={route} from={options.routes[route]} to={routes[route] as string}/>
          }
          return <ReactRoute exact key={route} path={options.routes[route]} component={routes[route] as PageConstructor}/>
        })}
        {Object.values(options.routes).indexOf("/") !== -1 && <ReactRedirect from="*" to="/"/>}
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
