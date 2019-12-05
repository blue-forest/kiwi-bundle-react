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

  private static convertStyle(style: StyleSheet): React.CSSProperties {
    if(Array.isArray(style)) {
      return style.reduce((result, currentStyle) => {
        if(
          (typeof currentStyle.min === "undefined" || this.currentSize >= currentStyle.min)
          && (typeof currentStyle.max === "undefined" || this.currentSize <= currentStyle.max)
        ) {
          result = Object.assign(result, currentStyle.style)
        }
        return result
      }, {} as React.CSSProperties)
    }
    return style
  }

  private static update() {
    this.width = window.innerWidth
    this.height = window.innerHeight
    if(typeof this.theme !== "undefined") {
      const newSize = Object.values(this.theme.sizes).reduce((result, current, index) => {
        if(index === 0 || result <= this.width) return current + 1
        return result
      }, 0)
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

  static bind(style: StyleSheet, update: ArchitectUpdate): number | null {
    if(typeof this.theme !== "undefined") {
      this.bindings.push({ style, update })
      return this.bindings.length - 1
    }
    return null
  }

  static getStyle(index: number): React.CSSProperties {
    return this.convertStyle(this.bindings[index].style)
  }

  static unbind(index: number) {
    this.bindings.splice(index, 1)
  }

}
