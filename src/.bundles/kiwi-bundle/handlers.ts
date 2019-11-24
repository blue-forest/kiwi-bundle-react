import { NameField_ByLanguage } from "dropin-recipes"

export interface KiwiBundleHandlersOptions {
  app: {
    name: string
    author: string
    description: NameField_ByLanguage
  }
  dev: {
    webHost: string
    webPort: number
  }
}

export interface KiwiBundleHandlers {
  start: (path: string, outputDir: string, options: KiwiBundleHandlersOptions) => void
  build: (path: string, outputDir: string, options: KiwiBundleHandlersOptions) => void
}
