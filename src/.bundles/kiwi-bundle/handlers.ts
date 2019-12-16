import { KiwiBundleOptions } from "./options"

interface KiwiBundleHandlerParams {
  path: string
  outDir: string
  options: KiwiBundleOptions
  handlers: {
    client: string
  }
}

export type KiwiBundleStartHandler = (params: KiwiBundleHandlerParams) => void

export type KiwiBundleBuildHandler = (params: KiwiBundleHandlerParams) => void
