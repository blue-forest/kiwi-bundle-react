import { React, ReactNative } from "../vendors"
import { NavigationProp, useNavigation, useTheme } from "@react-navigation/native"
import { Navigation, NavigationCustom } from "./navigation"
import { StyleSheet } from "./styles"
import { AppLinks, AppOptions, AppTheme } from "./options"

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

export type AppComponent<Props = any> = React.ComponentType<Props>

export type AppRoutes<Routes = AppOptions["navigation"]["routes"]> = { [name in keyof Routes]: AppComponent }

enum FactoryType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export const App = <Options extends AppOptions>(options: Options) => {
  return (links: () => AppLinks<Options["appearance"]["colors"]>) => {
    console.log(links)
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
                  navigation.navigate(route as string, params)
                },
              },
              colors,
            }
            if (typeof states !== "undefined") {
              Object.keys(states).forEach(name => {
                const state = React.useState((states as any)[name])
                context.state.get[name] = state[0]
                context.state.set[name] = state[1]
              })
            }
            return render(context)
          }
        }
      }
    }

    const Render = <Routes extends AppRoutes<Options["navigation"]["routes"]>>(
      pages: Routes,
      custom?: NavigationCustom,
    ): void => {
      ReactNative.AppRegistry.registerComponent(options.key, Navigation<Options, Routes>(options, pages, custom))
      if (ReactNative.Platform.OS === "web") {
        ReactNative.AppRegistry.runApplication(options.key, {
          rootTag: document.getElementById("root"),
        })
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
      return () => theme({
        colors: options.appearance.colors,
      })
    }

    const Store = (store: any) => {
      console.log(store)
      return ""
    }

    return {
      Theme,
      StyleSheet,
      Component: factory(FactoryType.COMPONENT),
      Layout: factory(FactoryType.LAYOUT),
      Page: factory(FactoryType.PAGE),
      Store,
      Render,
    }
  }
}
