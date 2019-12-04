import * as React from "react"
import { StyleSheet } from "../styles"
import { KiwiBundleTheme } from "../bundle"
import { logger } from "./logger"

type ArchitectUpdate = (style: React.CSSProperties) => void

interface ArchitectBinding {
  style: StyleSheet
  update: ArchitectUpdate
}

export class Architect {
  private static theme?: KiwiBundleTheme
  private static bindings: ArchitectBinding[] = []
  private static width = 0
  private static height = 0
  private static currentSize = 0

  private static convertStyle(style: StyleSheet) {
    return (style as any).reduce((result: any, currentStyle: any) => {
      if(
        (typeof currentStyle.min === "undefined" || this.currentSize <= currentStyle.min)
        && (typeof currentStyle.max === "undefined" || this.currentSize >= currentStyle.max)
      ) {
        result = Object.assign(result, currentStyle.style)
      }
      return result
    }, {})
  }

  private static update() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    if(typeof this.theme !== "undefined") {
      const newSize = Object.values(this.theme.sizes).reduce((result, current) => {
        if(current <= this.width) {
          return current
        }
        return result
      }, this.currentSize)
      if(newSize !== this.currentSize) {
        this.currentSize = newSize
        this.bindings.forEach(binding => {
          binding.update(this.convertStyle(binding.style))
        })
      }
    }
  }

  static init(theme: KiwiBundleTheme) {
    this.theme = theme
    this.update()
    window.addEventListener("resize", this.update.bind(this))
    logger.logSuccess("Architect", "Init")
  }

  static bind(style: StyleSheet, update: ArchitectUpdate): React.CSSProperties {
    if(typeof this.theme !== "undefined") {
      this.bindings.push({ style, update })
      return this.convertStyle(style)
    }
    return {}
  }

}
