import { Theme } from "@react-navigation/native"
import { ReactNative } from "../vendors"

type ThemeColor<Colors> = string | ((colors: Colors) => string)

export type AppOptions<Colors extends { [name in keyof Colors]: string } = { [name: string]: string }> = {
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
  appearance: {
    header?: {
      hide?: boolean
      style?: ReactNative.Animated.WithAnimatedValue<ReactNative.StyleProp<ReactNative.ViewStyle>>
    }
    sizes: { [name: string]: number | string }
    colors: Colors
    themes: {
      [name: string]: {
        colors: {
          [color in keyof Theme["colors"]]: ThemeColor<Colors> | { dark: ThemeColor<Colors>, light: ThemeColor<Colors> }
        }
      }
    }
    fonts?: any // TODO
  }
  platforms?: {
    web?: {
      title?: string | ((page?: string) => string)
    }
  }
}
