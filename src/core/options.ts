
export type AppOptions = {
  key: string
  navigation: {
    title?: string | ((page?: string) => string)
    routes: {
      [name: string]: {
        path: string
        title?: string
      }
    }
    prefixes: string[]
  }
  theme?: any // TODO
  fonts?: any // TODO
}
