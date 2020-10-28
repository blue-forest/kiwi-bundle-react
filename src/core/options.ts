import { Theme } from "@react-navigation/native"
import { ReactNative } from "../vendors"

type ThemeColor<Colors> = string | ((colors: Colors) => string)

export type AppOptions<Options extends AppOptions<Options>> = {
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
    colors: { [name: string]: string }
    themes: {
      [name: string]: {
        colors: {
          [color in keyof Theme["colors"]]:
          ThemeColor<keyof Options["appearance"]["sizes"]>
          | { dark: ThemeColor<keyof Options["appearance"]["sizes"]>, light: ThemeColor<keyof Options["appearance"]["sizes"]> }
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
