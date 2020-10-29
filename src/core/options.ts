import { Theme } from "@react-navigation/native"
import { ReactNative } from "../vendors"
import { AppComponent } from "./app"

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

export type AppLinks<Options extends AppOptions> = {
  pages: {
    [name in keyof Options["navigation"]["routes"]]: Promise<{ default: AppComponent }>
  }
  themes?: {
    [theme: string]: Promise<{ default: AppTheme<Options["appearance"]["colors"]> }>
  }
  stores?: {
    [store: string]: Promise<{ default: string }>
  }
  custom?: {
    header?: {
      left?: Promise<{ default: AppComponent<{}> }>
      right?: Promise<{ default: AppComponent<{}> }>
    }
  }
}
