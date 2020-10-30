import { React, ReactNative } from "../vendors"
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native"
import { Navigation } from "./navigation"
import { StyleSheet } from "./styles"
import { AppLinks, AppLinksCustom, AppLinksImports, AppOptions, AppTheme } from "./options"

type States = { [name: string]: any }

type Props = { [name: string]: any }

type AppComponentConfig = {
  style?: StyleSheet
}

type AppComponentContext<Options extends AppOptions, Config extends AppComponentConfig, States, Props> = {
  props: Props
  style: Config["style"]
  navigation: {
    navigate: (route: keyof Options["navigation"]["routes"], params?: { [key: string]: string }) => void
  }
  state: {
    get: { [name in keyof States]: States[keyof States] }
    set: { [name in keyof States]: (v: States[keyof States]) => void }
  }
  colors: Options["appearance"]["colors"]
}

type AppComponentRender<Options extends AppOptions, Config extends AppComponentConfig, States, Props>
  = (context: AppComponentContext<Options, Config, States, Props>) => JSX.Element

export type AppComponent<Props = {}> = React.ComponentType<Props>

enum FactoryType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

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

export const App = <Options extends AppOptions>(options: Options) => {
  return (imports: AppLinksImports<Options>) => {
    const factory = (type: FactoryType) => <Config extends AppComponentConfig>(config?: Config) => {
      return <S extends States>(states?: S) => {
        return <P extends Props>(render: AppComponentRender<Options, Config, S, P>) => {
          return (props: any) => {
            const navigation: NavigationProp<any> = type === FactoryType.PAGE ? props.navigation : useNavigation()
            const { colors } = useTheme()
            const context: AppComponentContext<Options, Config, any, P> = {
              props: type === FactoryType.PAGE ? props.route.params : props,
              style: config?.style || {},
              state: { get: {}, set: {} },
              navigation: {
                navigate: (route, params) => {
                  navigation.navigate(route, params)
                },
              },
              colors,
            }
            if (typeof states !== "undefined") {
              Object.keys(states).forEach(name => {
                const state = React.useState(states[name])
                context.state.get[name] = state[0]
                context.state.set[name] = state[1]
              })
            }
            return render(context)
          }
        }
      }
    }

    const StyleSheet = <S1 extends StyleSheet<S1>, S2 extends StyleSheet<S2>>(style1: S1, style2?: S2) => {
      const style: StyleSheet = style1
      if (typeof style2 !== "undefined") {
        Object.keys(style2).forEach(key => {
          const value = (style2 as StyleSheet)[key]
          if (typeof style[key] === "undefined") {
            style[key] = value
          } else {
            style[key] = Object.assign(style[key], value)
          }
        })
      }
      return ReactNative.StyleSheet.create(style as S1 & S2)
    }

    const Theme = (theme: (context: { colors: Options["appearance"]["colors"] }) => AppTheme<Options["appearance"]["colors"]>) => {
      return theme({
        colors: options.appearance.colors,
      })
    }

    const Store = (store: any) => {
      console.log(store)
      return ""
    }

    const Custom = <Props>(custom: AppLinksCustom<Props>) => custom

    Promise.resolve<AppLinks<any>>({ pages: {} }).then(links => {
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
        return Promise.resolve<NonNullable<AppLinks<any>["custom"]>>({}).then(custom => {
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
      Theme,
      StyleSheet,
      Component: factory(FactoryType.COMPONENT),
      Layout: factory(FactoryType.LAYOUT),
      Page: factory(FactoryType.PAGE),
      Store,
      Custom,
    }
  }
}
