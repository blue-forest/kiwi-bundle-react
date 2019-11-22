

export interface KiwiBundleHandler {
  start: (path: string) => void
  build: (path: string) => void
}
