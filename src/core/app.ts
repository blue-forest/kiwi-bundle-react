import { ReactNative } from "../vendors"
import { Navigation } from "./navigation"
import { AppStyleSheet } from "./styles"
import { AppLinks, AppLinksCustom, AppLinksResolve, AppLinksImports, AppTheme } from "./links"
import { Architect, ArchitectType } from "./architect"
import { React } from "../vendors"
import { DefaultTheme, Theme } from "@react-navigation/native"

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

type AppGlobalState = { theme: Theme }

type AppGlobalStateCallbacks<Data> = ((data: Data) => void)[]

type Actions<Input, Output> = {
  get: () => Output
  set: (data: Input) => void
  bind: (get: () => Output, update: (data: Input) => void) => void
}

export type AppStateGlobalActions = {
  getTheme: () => Theme
  setTheme: (theme: string) => void
  onThemeUpdate: (update: (theme: string) => void) => void
  getScheme: () => ReactNative.ColorSchemeName
  setScheme: (scheme: ReactNative.ColorSchemeName) => void
  onSchemeUpdate: (update: (scheme: ReactNative.ColorSchemeName) => void) => void
}

export const App = <Config extends AppConfig, Links extends AppLinksImports<Config>>(options: Config, links: Links) => {
  const globalState: AppGlobalState = { theme: { DefaultTheme } }
  const globalStateSchemeCallbacks: AppGlobalStateCallbacks<AppGlobalState["theme"]["dark"]> = []
  const globalStateThemeCallbacks: AppGlobalStateCallbacks<AppGlobalState["theme"]> = []
  const globalStateActions: AppStateGlobalActions = {
    setTheme: theme => {
      globalState.theme = theme
      globalStateThemeCallbacks.forEach(update => update(theme))
    },
    getTheme: () => globalState.theme,
    onThemeUpdate: callback => { globalStateThemeCallbacks.push(callback) },
    setScheme: scheme => {
      globalState.scheme = scheme
      globalStateSchemeCallbacks.forEach(update => update(scheme))
    },
    getScheme: () => globalState.scheme,
    onSchemeUpdate: callback => { globalStateSchemeCallbacks.push(callback) },
  }
  return {
    Component: Architect<Config, Links>(ArchitectType.COMPONENT, globalStateActions),
    Layout: Architect<Config, Links>(ArchitectType.LAYOUT, globalStateActions),
    Page: Architect<Config, Links>(ArchitectType.PAGE, globalStateActions),
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
    Render: () => {
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
      const linksResolve: AppLinksResolve = links
      Promise.resolve<AppLinks<any>>({ pages: {} }).then(resolvedLinks => {
        return resolveImports(linksResolve.pages).then(pages => {
          resolvedLinks.pages = pages
        }).then(() => {
          if (typeof linksResolve.themes === "undefined") return
          return resolveImports(linksResolve.themes).then(themes => { resolvedLinks.themes = themes })
        }).then(() => {
          if (typeof linksResolve.stores === "undefined") return
          return resolveImports(linksResolve.stores).then(stores => { resolvedLinks.stores = stores })
        }).then(() => {
          if (typeof linksResolve.custom === "undefined") return
          const importsCustom = linksResolve.custom
          return Promise.resolve<NonNullable<AppLinks<any>["custom"]>>({}).then(custom => {
            if (typeof importsCustom.header === "undefined") return custom
            return resolveImports(importsCustom.header).then(header => {
              custom.header = header
              return custom
            })
          }).then(custom => {
            resolvedLinks.custom = custom
          })
        }).then(() => resolvedLinks)
      }).then(resolvedLinks => {
        ReactNative.AppRegistry.registerComponent(options.key, Navigation(options, resolvedLinks, globalStateActions))
        if (ReactNative.Platform.OS === "web") {
          ReactNative.AppRegistry.runApplication(options.key, {
            rootTag: document.getElementById("root"),
          })
        }
      })
    },
  }
}
