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

export type AppComponent<Props = {}> = React.ComponentType<Props>

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

export const App = <Config extends AppConfig>(options: Config) => {
  return (imports: AppLinksImports<Config>) => {
    Promise.resolve<AppLinks>({ pages: {} }).then(links => {
      return resolveImports(imports.pages).then(pages => {
        links.pages = pages
      }).then(() => {
        if (typeof imports.themes === "undefined") return
        return resolveImports(imports.themes).then(themes => { links.themes = themes })
      }).then(() => {
        if (typeof imports.stores === "undefined") return
        return resolveImports(imports.stores).then(stores => { links.stores = stores })
      }).then(() => {
        if (typeof imports.custom === "undefined") return
        const importsCustom = imports.custom
        return Promise.resolve<NonNullable<AppLinks["custom"]>>({}).then(custom => {
          if (typeof importsCustom.header === "undefined") return custom
          return resolveImports(importsCustom.header).then(header => {
            custom.header = header
            return custom
          })
        }).then(custom => {
          links.custom = custom
        })
      }).then(() => links)
    }).then(links => {
      ReactNative.AppRegistry.registerComponent(options.key, Navigation(options, links))
      if (ReactNative.Platform.OS === "web") {
        ReactNative.AppRegistry.runApplication(options.key, {
          rootTag: document.getElementById("root"),
        })
      }
    })
    return {
      Component: Architect<Config>(ArchitectType.COMPONENT),
      Layout: Architect<Config>(ArchitectType.LAYOUT),
      Page: Architect<Config>(ArchitectType.PAGE),
      Theme: (theme: (context: { colors: Config["appearance"]["colors"] }) => AppTheme<Config["appearance"]["colors"]>) => {
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
      Store: () => {
        return ""
      },
      Custom: <Props>(custom: AppLinksCustom<Props>) => custom,
    }
  }
}
