import { WebpackConfig } from "../../handlers/webpack/core"
import { NameField_ByLanguage } from "dropin-recipes"

export interface KiwiBundleOptions {
  app: {
    name: string
    author: string
    description: NameField_ByLanguage
  }
  dev: {
    webHost: string
    webPort: number
  }
  webpack?: WebpackConfig
}
