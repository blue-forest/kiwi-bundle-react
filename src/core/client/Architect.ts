import * as React from "react"
import { StyleSheet, CSSProperties } from "../styles"
import { KiwiBundleReactTheme } from "../bundle"
import { logger } from "./logger"

type ArchitectUpdate = (style: React.CSSProperties) => void

interface ArchitectBinding {
  style: StyleSheet
  update: ArchitectUpdate
}

// type ArchitectSizes = { [index: number]: { min: number[], max: number[] } }

export class Architect {
  private static theme?: KiwiBundleReactTheme
  private static bindings: ArchitectBinding[] = []
  // private static sizes: ArchitectSizes = []
  private static width = 0
  private static height = 0
  private static currentSize = -1
  private static nextId = 0

  private static convertStyle(style: StyleSheet): CSSProperties {
    if(Array.isArray(style)) {
      return style.reduce((result, currentStyle) => {
        if(
          (typeof currentStyle.min === "undefined" || this.width >= currentStyle.min)
          && (typeof currentStyle.max === "undefined" || this.width <= currentStyle.max)
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
    if(typeof this.theme !== "undefined" && typeof this.theme.sizes !== "undefined") {
      const newSize = Object.values(this.theme.sizes).reduce((result, current) => {
        return this.width > current ? current : result
      }, 0)
      if(newSize !== this.currentSize) {
        this.currentSize = newSize
        this.bindings.forEach(binding => {
          if(Array.isArray(binding.style)) {
            binding.update(this.convertStyle(binding.style))
          }
        })
      }
      /*const newSize = Object.keys(this.sizes).reduce((result, current, index) => {
        if(index === 0 || result <= this.width) return current
        return result
      }, 0 as any)*/
    }
  }

  static init(theme: KiwiBundleReactTheme) {
    this.theme = theme
    this.update()
    window.addEventListener("resize", this.update.bind(this))
    logger.logSuccess("Architect", "Init")
  }

  static bind(update: ArchitectUpdate): number {
    if(typeof this.theme !== "undefined") {
      this.bindings[this.nextId] = { style: {}, update }
      return this.nextId++
      /*if(Array.isArray(style)) {
        style.forEach(currentStyle => {
          if(typeof currentStyle.min !== "undefined") {
            if(typeof this.sizes[currentStyle.min] === "undefined") {
              this.sizes[currentStyle.min] = { min: [ this.nextId ], max: [] }
            } else {
              this.sizes[currentStyle.min].min.push(this.nextId)
            }
          }
          if(typeof currentStyle.max !== "undefined") {
            if(typeof this.sizes[currentStyle.max] === "undefined") {
              this.sizes[currentStyle.max] = { max: [ this.nextId ], min: [] }
            } else {
              this.sizes[currentStyle.max].max.push(this.nextId)
            }
          }
        })
      }*/
    }
    return -1
  }

  static updateStyle(id: number, style?: StyleSheet): React.CSSProperties {
    if(id !== -1) {
      if(typeof style !== "undefined") {
        this.bindings[id].style = style
      }
      return this.convertStyle(this.bindings[id].style)
    }
    return {}
  }

  static unbind(id: number) {
    if(id !== -1) {
      delete this.bindings[id]
    }
  }

}
