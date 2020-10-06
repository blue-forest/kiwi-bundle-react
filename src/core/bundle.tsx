import React from "react"
import * as ReactNative from "react-native"
import { KeysObject } from "dropin-client"

type KiwiBundleReactOptions = {
  id: string
  routes: {
    [name: string]: { path: string };
  };
}

type KiwiBundleReactPageOptionsRender<Props, States> = {
  props: Props;
  state: {
    get: { [name in keyof States]: States[keyof States] };
    set: { [name in keyof States]: (v: States[keyof States]) => void };
  };
}

type KiwiBundleReactPageOptions<Props, States> = {
  states?: States;
  render: (
    render: KiwiBundleReactPageOptionsRender<Props, States>,
  ) => JSX.Element;
}

type KiwiBundleReactPage<Props = any> = React.ComponentType<Props>

export const Bundle = <Options extends KiwiBundleReactOptions>(options: Options) => {
  const hack = React

  const Component = <
    Props extends { [name: string]: any } = any,
    States extends { [name: string]: any } = any
  >(
    page: KiwiBundleReactPageOptions<Props, States>,
  ): KiwiBundleReactPage<Props> => {
    return () => {
      const render: any = { state: { get: {}, set: {} } }
      if (typeof page.states !== "undefined") {
        Object.keys(page.states).forEach(name => {
          const state = hack.useState((page.states as any)[name])
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
    ReactNative.AppRegistry.registerComponent(options.id, () => () => {
      return (
        <ReactNative.View>
          {Object.values(routes).map((Page, index) => {
            return <Page key={index} test="OK" />
          })}
        </ReactNative.View>
      )
    })
    if (ReactNative.Platform.OS === "web") {
      ReactNative.AppRegistry.runApplication(options.id, {
        rootTag: document.getElementById("root"),
      })
    }
  }

  const StyleSheet = ReactNative.StyleSheet.create

  return {
    Component,
    Layout: Component,
    Page: Component,
    Render,
    StyleSheet,
  }
}
