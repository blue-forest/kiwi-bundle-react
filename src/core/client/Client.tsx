import * as React from "react"
import { i18nSettings } from "dropin-recipes"
import { render } from "react-dom"
import { logger } from "./logger"
import { Router } from "../routes/Router"
import "./sw"

let STARTED = false

export function onDevEnv(callback: () => void) {
  if(typeof module.hot !== "undefined") {
    callback()
  }
}

export class Client {

  constructor(router: Router) {
    // i18n
    i18nSettings.setCurrentLanguageFromString(navigator.language.slice(0, 2))
    i18nSettings.setMarkdownCompiler<React.ReactElement>({
      bold: (id, children) => <strong key={id} children={children}/>,
      link: (id, link, children, options) => <a
        key={id}
        href={link}
        children={children}
        id={options.id}
        className={options.className}
        target={options.target}
      />,
    })

    // Render
    render(router.render(), document.getElementById("render"), () => {
      logger.logSuccess(this, STARTED ? "Restarted" : "Started")
      STARTED = true
    })

    // Service Worker activation (now done by Webpack)
    // serviceWorkerClient.load()

    onDevEnv(() => {
      // Hot reloading
      this.loadHotModule()
    })
  }

  private loadHotModule() {
    // Listen for updates
    const moduleCacheChildren: string[] = require.cache[0].children as any
    const clientModuleName = moduleCacheChildren[moduleCacheChildren.length - 1]
    const clientModule: NodeModule = require.cache[clientModuleName]
    if(typeof clientModule.hot !== "undefined") {
      clientModule.hot.accept()
      logger.logInfo("Hot", "Listening")
    }

    // Force Service Worker cache
    const httpRequest = new XMLHttpRequest()
    httpRequest.open("GET", "/")
    httpRequest.send()
  }

}
