import { ReactNative } from "../vendors"
import { Navigation } from "./navigation"
import { AppStyleSheet } from "./styles"
import { AppLinks, AppLinksCustom, AppLinksImports, AppTheme } from "./links"
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

export type AppComponent<Props> = React.ComponentType<Props>

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

export type App<Config extends AppConfig, Links extends AppLinksImports<Config>> = {
  Component: Architect<Config, Links>
  Layout: Architect<Config, Links>
  Page: Architect<Config, Links>
  Theme: <Theme extends AppTheme<Config["appearance"]["colors"]>>(theme: (context: { colors: Config["appearance"]["colors"] }) => Theme) => Theme
  StyleSheet: <S1 extends AppStyleSheet, S2 extends AppStyleSheet>(style1: S1, style2?: S2) => S1 & S2
  Store: () => string
  Custom: <Props>(custom: AppLinksCustom<Props>) => AppLinksCustom<Props>
}

export const App = <Config extends AppConfig, Links extends AppLinksImports<Config>>(options: Config) => {
  return (links: Links): App<Config, Links> => {
    Promise.resolve<AppLinks>({ pages: {} }).then(resolvedLinks => {
      return resolveImports(links.pages).then(pages => {
        resolvedLinks.pages = pages
      }).then(() => {
        if (typeof links.themes === "undefined") return
        return resolveImports(links.themes).then(themes => { resolvedLinks.themes = themes })
      }).then(() => {
        if (typeof links.stores === "undefined") return
        return resolveImports(links.stores).then(stores => { resolvedLinks.stores = stores })
      }).then(() => {
        if (typeof links.custom === "undefined") return
        const importsCustom = links.custom
        return Promise.resolve<NonNullable<AppLinks["custom"]>>({}).then(custom => {
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
      ReactNative.AppRegistry.registerComponent(options.key, Navigation(options, resolvedLinks))
      if (ReactNative.Platform.OS === "web") {
        ReactNative.AppRegistry.runApplication(options.key, {
          rootTag: document.getElementById("root"),
        })
      }
    })
    return {
      Component: Architect<Config, Links>(ArchitectType.COMPONENT),
      Layout: Architect<Config, Links>(ArchitectType.LAYOUT),
      Page: Architect<Config, Links>(ArchitectType.PAGE),
      Theme: theme => theme({
        colors: options.appearance.colors,
      }),
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
      Custom: custom => custom,
    }
  }
}
