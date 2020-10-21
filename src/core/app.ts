import { React, ReactNative } from "../vendors"
import { KeysObject } from "dropin-client"
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

export type StyleSheetViewStyle = ReactNative.ViewStyle

export type StyleSheetTextStyle = ReactNative.TextStyle

export type StyleSheetImageStyle = ReactNative.ImageStyle

export type StyleSheetStyle = StyleSheetViewStyle | StyleSheetTextStyle | StyleSheetImageStyle

type StyleSheetMediaQuery = {
  min?: number
  max?: number
  style: StyleSheetStyle
}

export type StyleSheet<Style = any> = {
  [Name in keyof Style]: StyleSheetStyle | StyleSheetMediaQuery[]
}

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
    ReactNative.AppRegistry.registerComponent(options.key, Navigation(options.navigation, pages))
    if (ReactNative.Platform.OS === "web") {
      ReactNative.AppRegistry.runApplication(options.key, {
        rootTag: document.getElementById("root"),
      })
    }
  }

  const StyleSheet = <Style extends StyleSheet<Style> = StyleSheet>(style: Style): Style => style

  return {
    Component,
    Layout: Component,
    Page: Component,
    Render,
    StyleSheet,
  }
}
