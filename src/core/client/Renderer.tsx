import React from "react"
import { i18nSettings } from "dropin-recipes"
import { render } from "react-dom"
import { Router } from "../router/Router"
import { Text, Link } from "../components"
import { logger } from "./logger"
import { KiwiBundleTheme } from "../bundle"
import { Architect } from "./Architect"

export const onDevEnv = (callback: () => void) => {
  if(typeof module.hot !== "undefined") {
    callback()
  }
}

let STARTED = false

export const Renderer = (router: Router, theme?: KiwiBundleTheme): void => {
  // i18n
  i18nSettings.setCurrentLanguageFromString(navigator.language.slice(0, 2))
  i18nSettings.setMarkdownCompiler<React.ReactElement>({
    bold: (id, children) => <Text key={id} style={{ fontWeight: "bold", }} children={children}/>,
    link: (id, link, children, options) => <Link
      key={id}
      path={link}
      children={children}
      target={options.target}
    />,
  })

  // Architect
  if(!STARTED && typeof theme !== "undefined") {
    Architect.init(theme)
  }

  // Render
  render(router.render(), document.getElementById("render"), () => {
    logger.logSuccess("Renderer", STARTED ? "Restarted" : "Started")
    STARTED = true
  })

  // Development mode
  onDevEnv(() => {
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
  })
}
