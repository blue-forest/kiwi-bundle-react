import { React, Kiwi } from "../kiwi-bundle-react"

type KiwiBundleReactOptions = {
  routes: {
    [name: string]: {
      path: string
    }
  }
}

type KiwiBundleReactPageOptionsRender<Props, States> = {
  props: Props
  state: {
    get: { [name in keyof States]: States[keyof States] }
    set: { [name in keyof States]: (v: States[keyof States]) => void }
  }
}

type KiwiBundleReactPageOptions<Props, States> = {
  states?: States
  render: (
    render: KiwiBundleReactPageOptionsRender<Props, States>,
  ) => JSX.Element
}

type KiwiBundleReactPage<Props = any> = React.ComponentType<Props>

export const KiwiBundleReact = <Options extends KiwiBundleReactOptions>(
  _: Options,
) => {
  console.log("BUNDLE INIT")
  const hack = React
  const Component = <
    Props extends { [name: string]: any } = any,
    States extends { [name: string]: any } = any
  >(
    page: KiwiBundleReactPageOptions<Props, States>,
  ): KiwiBundleReactPage<Props> => {
    return props => {
      console.log(props)
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
  return {
    Component,
    Layout: Component,
    Page: Component,
    Render: <Routes extends any[]>( //extends KeysObject<KiwiBundleReactPage, Options["routes"]>>(
      routes: Routes,
    ): void => {
      Kiwi.AppRegistry.registerComponent("kbrd", () => () => {
        return (
          <Kiwi.View>
            {Object.values(routes).map((Page, index) => {
              return <Page key={index} test="OK" />
            })}
          </Kiwi.View>
        )
      })
      if (Kiwi.Platform.OS === "web") {
        Kiwi.AppRegistry.runApplication("kbrd", {
          rootTag: document.getElementById("root"),
        })
      }
    },
  }
}
