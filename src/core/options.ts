
export type AppOptions = {
  key: string
  navigation: {
    routes: {
      [name: string]: {
        path: string
        title?: string
      }
    }
    prefixes: string[]
  }
  web?: {
    title?: string | ((page?: string) => string)
  }
  theme?: any // TODO
  fonts?: any // TODO
}
