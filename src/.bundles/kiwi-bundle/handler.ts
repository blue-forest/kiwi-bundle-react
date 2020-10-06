import { KiwiBundleOptions } from "./options"

export interface KiwiBundleHandlerParams {
  path: string
  outDir: string
  options: KiwiBundleOptions
  handlers: {
    client: string
  }
  args: string[]
}

export type KiwiBundleHandler = (params: KiwiBundleHandlerParams) => void
