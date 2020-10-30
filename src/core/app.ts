import { ReactNative } from "../vendors"
import { Navigation } from "./navigation"
import { AppStyleSheet } from "./styles"
import { AppLinks, AppLinksCustom, AppTheme } from "./links"
import { Architect, ArchitectType } from "./architect"

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

export type AppComponentStates = { [name: string]: any }

export type AppComponentProps = { [name: string]: any }

export type AppComponent<Props extends AppComponentProps = {}> = React.ComponentType<Props>

const resolveImports = <Content>(from: { [key: string]: Promise<{ default: Content }> | undefined }) => {
  return Object.keys(from).reduce<Promise<{ [key: string]: Content }>>((promise, key) => promise.then(all => {
    const item = from[key]
    if (typeof item === "undefined") return all
    return item.then(current => {
      all[key] = current.default
      return all
    })
  }), Promise.resolve({}))
}

export const App = <Config extends AppConfig, Links extends AppLinks<Config>>(options: Config, links: Links) => {
  ReactNative.AppRegistry.registerComponent(options.key, Navigation(options, links))
  if (ReactNative.Platform.OS === "web") {
    ReactNative.AppRegistry.runApplication(options.key, {
      rootTag: document.getElementById("root"),
    })
  }
  return {
    Component: Architect<Config, Links>(ArchitectType.COMPONENT),
    Layout: Architect<Config, Links>(ArchitectType.LAYOUT),
    Page: Architect<Config, Links>(ArchitectType.PAGE),
    Theme: <Theme extends AppTheme<Config>>(theme: (context: { colors: Config["appearance"]["colors"] }) => Theme) => {
      return theme({
        colors: options.appearance.colors,
      })
    },
    StyleSheet: <S1 extends AppStyleSheet, S2 extends AppStyleSheet>(style1: S1, style2?: S2) => {
      const style: AppStyleSheet = style1
      if (typeof style2 !== "undefined") {
        Object.keys(style2).forEach(key => {
          const value = (style2 as AppStyleSheet)[key]
          if (typeof style[key] === "undefined") {
            style[key] = value
          } else {
            style[key] = Object.assign(style[key], value)
          }
        })
      }
      return style as S1 & S2
    },
    Store: () => "",
    Custom: <Props extends AppComponentProps>(custom: AppLinksCustom<Props>): AppLinksCustom<Props> => custom,
  }
}
