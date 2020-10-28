import { ReactNative } from "../vendors"

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
  header?: {
    hide?: boolean
    style?: ReactNative.Animated.WithAnimatedValue<ReactNative.StyleProp<ReactNative.ViewStyle>>
  }
  themes?: any // TODO
  fonts?: any // TODO
  web?: {
    title?: string | ((page?: string) => string)
  }
}
