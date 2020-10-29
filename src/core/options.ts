import { Theme } from "@react-navigation/native"
import { ReactNative } from "../vendors"

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

type AppThemeColor<Colors> = string | ((colors: Colors) => string)

export type AppTheme<Colors = AppOptions["appearance"]["colors"]> = {
  [color in keyof Theme["colors"]]: AppThemeColor<Colors> | {
    dark: AppThemeColor<Colors>
    light: AppThemeColor<Colors>
  }
}

export type AppLinks<Colors> = {
  themes: { [theme: string]: AppTheme<Colors> }
  stores: { [store: string]: string }
}
