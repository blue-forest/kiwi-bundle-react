import { KeysObject } from "dropin-client"
import { React, ReactNative } from "../vendors"
import { NavigationOptions, Navigation } from "./navigation"

type AppOptions = {
  key: string
  navigation: NavigationOptions
}

type StyleSheet = string

/*type PropsType = { [name: string]: any }

type StatesType = { [name: string]: any }*/

type AppComponentOptionsRender<Props extends any, States extends any, Style extends any> = {
  props: Props
  style: Style
  state: {
    get: { [name in keyof States]: States[keyof States] }
    set: { [name in keyof States]: (v: States[keyof States]) => void }
  }
}

type AppComponentOptions<States extends any> = {
  style?: StyleSheet
  states?: States
}

export type AppComponent<Props = any> = React.ComponentType<Props>

export type AppRoutes = KeysObject<AppComponent, NavigationOptions["routes"]>

export const App = <Options extends AppOptions>(options: Options) => {
  const react = React

  const Component = <Props extends {} = any, States extends {} = any, Options extends AppComponentOptions<States> = any>(
    component: Options,
    render: (options: AppComponentOptionsRender<Props, States, Options["style"]>) => JSX.Element,
  ) => {
    return (props: Props) => {
      const renderOptions: AppComponentOptionsRender<Props, any, Options["style"]> = {
        props,
        style: component.style || {} as Options["style"],
        state: { get: {}, set: {} },
      }
      if (typeof component.states !== "undefined") {
        Object.keys(component.states).forEach(name => {
          const state = react.useState((component.states as any)[name])
          renderOptions.state.get[name] = state[0]
          renderOptions.state.set[name] = state[1]
        })
      }
      return render(renderOptions)
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
      create: ReactNative.StyleSheet.create,
      extends: StyleSheetExtends,
    },
  }
}
