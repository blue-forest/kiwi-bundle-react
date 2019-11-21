import { WebpackMode } from "../../webpack/core"

const generateCss = (color: string) => [
//  "border: 1px solid black",
  "padding: 2px 10px",
  "background-color: " + color,
//  "color: white",
  "font-size: 12px",
].join(";")

type ContextType = Object|string

class Logger {
  private enabled: boolean = false
  private previous: Date|null = null

  constructor() {
    if(process.env.NODE_ENV !== WebpackMode.PRODUCTION) {
      this.enabled = true
    }
  }

  disable() {
    if(this.enabled) {
      this.enabled = false
      this.logInfo(this, "Disabled")
    } else {
      this.logError(this, "Already disabled")
    }
  }

  private dateToText(date: Date) {
    return date.getFullYear()
      + " " + date.getMonth()
      + " " + date.getDate()
      + " " + date.getHours()
      + " " + date.getMinutes()
      + " " + date.getSeconds()
      + " " + date.getMilliseconds()
  }

  private log(context: ContextType, force: boolean, color: string, title: string, ...data: any) {
    if(force || this.enabled) {
      const isObject = typeof context !== "string"

      const label = `%c${isObject ? context.constructor.name : context}`
      const css = generateCss(color)

      console.groupCollapsed(label, css, title)

      const now = new Date()

      const contextData: { instance?: ContextType, time: string } = {
        time: this.dateToText(now),
      }

      if(this.previous !== null) {
        contextData.time +=  ` (${now.getTime() - this.previous.getTime()} ms from prev.)`
      }
      this.previous = now

      if(isObject) {
        contextData.instance = context
      }

      console.log("\\_> Context", contextData)

      data.forEach((element: any) => {
        console.log(element)
      })

      console.groupEnd()
    }
  }

  logSuccess(context: ContextType, title: string, ...data: any) {
    this.log(context, false, "#a4f6a5", title, ...data)
  }

  logError(context: ContextType, title: string,  ...data: any) {
    this.log(context, true, "#f68787", title, ...data)
  }

  logInfo(context: ContextType, title: string,  ...data: any) {
    this.log(context, false, "#f1eb9a", title, ...data)
  }

  logView(context: ContextType, title: string,  ...data: any) {
    this.log(context, false, "#f8a978", title, ...data)
  }

}

export const logger = new Logger()
