import { KeysObject } from "dropin-client"
import { React, ReactNative } from "../vendors"
import { Navigation } from "./navigation"

type AppOptions = {
  key: string
  routes: {
    [name: string]: { path: string };
  }
}

type ComponentOptionsRender<Props, States> = {
  props: Props;
  state: {
    get: { [name in keyof States]: States[keyof States] };
    set: { [name in keyof States]: (v: States[keyof States]) => void };
  };
}

type ComponentOptions<Props, States> = {
  states?: States;
  render: (
    render: ComponentOptionsRender<Props, States>,
  ) => JSX.Element;
}

type KiwiBundleReactPage<Props = any> = React.ComponentType<Props>

export const App = <Options extends AppOptions>(options: Options) => {
  const react = React

  const Component = <
    Props extends { [name: string]: any } = any,
    States extends { [name: string]: any } = any
  >(
    page: ComponentOptions<Props, States>,
  ): KiwiBundleReactPage<Props> => {
    return () => {
      const render: any = { state: { get: {}, set: {} } }
      if (typeof page.states !== "undefined") {
        Object.keys(page.states).forEach(name => {
          const state = react.useState((page.states as any)[name])
          render.state.get[name] = state[0]
          render.state.set[name] = state[1]
        })
      }
      return page.render(render)
    }
  }

  const Render = <Routes extends KeysObject<KiwiBundleReactPage, Options["routes"]>>(
    routes: Routes,
  ): void => {
    console.log(routes)
    ReactNative.AppRegistry.registerComponent(options.key, () => Navigation)
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
