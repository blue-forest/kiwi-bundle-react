import { React, ReactNative } from "../vendors"
import { KeysObject } from "dropin-client"
import { useNavigation } from "@react-navigation/native"
import { Navigation } from "./navigation"
import { StyleSheet } from "./styles"
import { AppOptions } from "./options"

type States = { [name: string]: any }

type Props = { [name: string]: any }

type AppComponentConfig = {
  style?: StyleSheet
}

type AppComponentContext<Options extends AppOptions, Config extends AppComponentConfig, States, Props> = {
  props: Props
  style: Config["style"]
  navigation: {
    navigate: (route: keyof Options["navigation"]["routes"]) => void
  }
  state: {
    get: { [name in keyof States]: States[keyof States] }
    set: { [name in keyof States]: (v: States[keyof States]) => void }
  }
}

type AppComponentRender<Options extends AppOptions, Config extends AppComponentConfig, States, Props>
  = (context: AppComponentContext<Options, Config, States, Props>) => JSX.Element

export type AppComponent<Props = any> = React.ComponentType<Props>

export type AppRoutes = KeysObject<AppComponent, AppOptions["navigation"]["routes"]>

enum FactoryType {
  COMPONENT,
  LAYOUT,
  PAGE,
}

export const App = <Options extends AppOptions>(options: Options) => {
  const factory = (type: FactoryType) => <Config extends AppComponentConfig>(config?: Config) => {
    return <S extends States>(states?: S) => {
      return <P extends Props>(render: AppComponentRender<Options, Config, S, P>) => {
        return (props: any) => {
          const navigation = type === FactoryType.PAGE ? props.navigation : useNavigation()
          const context: AppComponentContext<Options, Config, any, P> = {
            props : type === FactoryType.PAGE ? props.route.params : props,
            style: config?.style || {},
            state: { get: {}, set: {} },
            navigation: {
              navigate: (route: keyof Options["navigation"]["routes"]) => {
                navigation.navigate(route.toString())
              },
            },
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

  const Render = <Routes extends AppRoutes>(
    pages: Routes,
  ): void => {
    ReactNative.AppRegistry.registerComponent(options.key, Navigation(options, pages))
    if (ReactNative.Platform.OS === "web") {
      ReactNative.AppRegistry.runApplication(options.key, {
        rootTag: document.getElementById("root"),
      })
    }
  }

  const StyleSheet = <S1 extends StyleSheet<S1>, S2 extends StyleSheet<S2>>(style1: S1, style2?: S2) => {
    const style: StyleSheet = style1
    if(typeof style2 !== "undefined") {
      Object.keys(style2).forEach(key => {
        const value = (style2 as StyleSheet)[key]
        if(typeof style[key] === "undefined") {
          style[key] = value
        } else {
          style[key] = Object.assign(style[key], value)
        }
      })
    }
    return style as S1 & S2
  }

  return {
    Component: factory(FactoryType.COMPONENT),
    Layout: factory(FactoryType.LAYOUT),
    Page: factory(FactoryType.PAGE),
    Render,
    StyleSheet,
  }
}
