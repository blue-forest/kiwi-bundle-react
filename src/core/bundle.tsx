import "react-native-gesture-handler"
import React from "react"
import * as ReactNative from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { KeysObject } from "dropin-client"

type KiwiBundleReactOptions = {
  id: string
  routes: {
    [name: string]: { path: string };
  }
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
  const react = React

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
          const state = react.useState((page.states as any)[name])
          render.state.get[name] = state[0]
          render.state.set[name] = state[1]
        })
      }
      return page.render(render)
    }
  }

  const Stack = createStackNavigator()

  const Render = <Routes extends KeysObject<KiwiBundleReactPage, Options["routes"]>>(
    routes: Routes,
  ): void => {
    console.log(options.id)
    ReactNative.AppRegistry.registerComponent(options.id, () => () => {
      return (
        <NavigationContainer>
          <Stack.Navigator>
          {Object.values(routes).map((page) => {
            <Stack.Screen name="Home" component={page} />
          })}
        </Stack.Navigator>
        </NavigationContainer>
      )
    })
    if (ReactNative.Platform.OS === "web") {
      ReactNative.AppRegistry.runApplication(options.id, {
        rootTag: document.getElementById("root"),
      })
    }
  }

  type Style<T> = ReactNative.StyleProp<T> | ReactNative.StyleProp<T>[]
  const StyleSheetExtends = <A, B>(style1: Style<A>, style2: Style<B>): A & B => {
    if(!style2) return style1 as any
    if(!style1) return style2 as any
    if(typeof style1 === "object" && typeof style2 === "object") {
      return Object.keys(style2).reduce((all: any, key) => {
        const current = (style2 as any)[key]
        all[key] = typeof all[key] !== "undefined" ? Object.assign(all[key], current) : current
        return all
      }, style1)
    }
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
