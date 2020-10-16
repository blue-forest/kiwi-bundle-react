import { KeysObject } from "dropin-client"
import { React, ReactNative } from "../vendors"
import { NavigationOptions, Navigation } from "./navigation"

type AppOptions = {
  key: string
  navigation: NavigationOptions
}

type AppComponentConfig = {
  style?: ReactNative.StyleSheet.NamedStyles<any>
}

type States = { [name: string]: any }

type Props = { [name: string]: any }

type AppComponentContext<Props, States, Style> = {
  props: Props
  style: Style
  state: {
    get: { [name in keyof States]: States[keyof States] }
    set: { [name in keyof States]: (v: States[keyof States]) => void }
  }
}

type AppComponentRender<Props, States, Style> = (context: AppComponentContext<Props, States, Style>) => JSX.Element

export type AppComponent<Props = any> = React.ComponentType<Props>

export type AppRoutes = KeysObject<AppComponent, NavigationOptions["routes"]>

export const App = <Options extends AppOptions>(options: Options) => {
  const react = React

  const Component = <Config extends AppComponentConfig>(config?: Config) => {
    return <S extends States>(states?: S) => {
      return <P extends Props>(render: AppComponentRender<P, S, Config["style"]>) => {
        return (props: P) => {
          const context: AppComponentContext<P, any, Config["style"]> = {
            props,
            style: config?.style || {},
            state: { get: {}, set: {} },
          }
          if (typeof states !== "undefined") {
            Object.keys(states).forEach(name => {
              const state = react.useState((states as any)[name])
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
    ReactNative.AppRegistry.registerComponent(options.key, Navigation(options.navigation, pages))
    if (ReactNative.Platform.OS === "web") {
      ReactNative.AppRegistry.runApplication(options.key, {
        rootTag: document.getElementById("root"),
      })
    }
  }

  type Style<T> = ReactNative.StyleProp<T> | ReactNative.StyleProp<T>[]
  const StyleSheetExtends = <A, B>(style1: Style<A>, style2: Style<B>): A & B => {
    if(!style2) return style1 as any
    if(!style1) return style2 as any
    /*if(typeof style1 === "object" && typeof style2 === "object") {
      return Object.keys(style2).reduce((all: any, key) => {
        const current = (style2 as any)[key]
        all[key] = typeof all[key] !== "undefined" ? Object.assign(all[key], current) : current
        return all
      }, style1)
    }*/
    return {} as any
  }

  return {
    Component,
    Layout: Component,
    Page: Component,
    Render,
    StyleSheet: {
      create: <T extends ReactNative.StyleSheet.NamedStyles<T> | ReactNative.StyleSheet.NamedStyles<any>>(styles: T | ReactNative.StyleSheet.NamedStyles<T>): T => {
        return ReactNative.StyleSheet.create<T>(styles)
      },
      extends: StyleSheetExtends,
    },
  }
}
