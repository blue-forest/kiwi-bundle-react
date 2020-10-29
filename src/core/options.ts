import { ReactNative } from "../vendors"
import { AppTheme } from "./app"

export type AppOptions = {
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

export type AppLinks<Themes, Colors> = {
  themes: { [theme in keyof Themes]: AppTheme<Colors> }
  stores: { [store: string]: any }
}
