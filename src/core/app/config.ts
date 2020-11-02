import { ReactNative } from "../../vendors";

export type AppConfig = {
  key: string
  navigation: {
    routes: {
      [name: string]: { path: string, title?: string }
    }
    prefixes: string[]
  }
  appearance: {
    sizes: { [name: string]: number | string }
    colors: { [name: string]: string }
    header?: {
      hide?: boolean
      style?: ReactNative.Animated.WithAnimatedValue<ReactNative.StyleProp<ReactNative.ViewStyle>>
    }
  }
  platforms?: {
    web?: {
      title?: string | ((page?: string) => string)
    }
  }
}