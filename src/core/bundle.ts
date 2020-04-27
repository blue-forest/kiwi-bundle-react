import * as React from "react"
import { KeysObject } from "dropin-recipes"
import { Page as PageBase, Component as ComponentBase, ComponentProps, ComponentState, PageConstructor } from "./components"
import { Router } from "./router"
import { StyleSheetData } from "./styles"
import { Renderer } from "./client/Renderer"
import { Values } from "./values/Values"
import { Config as WebFontConfig } from "webfontloader"

export interface KiwiBundleReactTheme<Data extends KiwiBundleReactTheme<Data> = any> {
  sizes?: KeysObject<number, Data["sizes"]>
  colors?: KeysObject<string, Data["colors"]>
  fonts?: WebFontConfig
  css?: { [rule: string]: string }
}

export interface KiwiBundleReactOptions<Data extends KiwiBundleReactOptions<Data> = { routes: {}, theme: {} }> {
  routes: KeysObject<string, Data["routes"]>
  theme: KiwiBundleReactTheme<Data["theme"]>
}

interface KiwiBundlePageFunctionsContext {
  state: KiwiBundlePageState,
  values: KiwiBundlePageValues,
  props: {
    [key: string]: any
  },
  params: {
    [key: string]: any
  },
  setState: (state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => void)) => void
}

interface KiwiBundlePageValues {
  [key: string]: any
}

interface KiwiBundlePageState {
  [key: string]: any
}

export type KiwiBundleReactRender = PageConstructor | string

interface KiwiBundlePage<Params, Theme> {
  values?: KiwiBundlePageValues
  functions?: { [key: string]: (context: KiwiBundlePageFunctionsContext) => any }
  init?(context: KiwiBundlePageFunctionsContext): void
  onDidMount?(context: KiwiBundlePageFunctionsContext): void
  render(context: KiwiBundlePageFunctionsContext & { theme: Theme }): React.ReactNode
}

interface KiwiBundleComponent<Props, Theme> {
  values?: { [key: string]: any }
  state?: { [key: string]: any }
  render(context: { props: Props, theme: Theme } & { style?: React.CSSProperties }): React.ReactNode
}

export class KiwiBundleReact<Options extends KiwiBundleReactOptions<Options> = KiwiBundleReactOptions> {
  public options: Options
  public router = new Router()

  constructor(options: Options) {
    this.options = options
  }

  Values<Data extends Values<Data, any>>(values: (theme: Options["theme"]) => Data): Data {
    return values(this.options.theme)
  }

  StyleSheet<Data extends StyleSheetData<Data>>(style: (theme: Options["theme"]) => Data): Data {
    return style(this.options.theme)
  }

  Page<Params = {}>(page: KiwiBundlePage<Params, Options["theme"]>) {
    const theme = this.options.theme
    return class Page extends PageBase<Params> {
      constructor(props: any) {
        super(props)

        if(typeof page.init !== "undefined") {
          page.init(this.getContext())
        }
      }

      componentDidMount() {
        super.componentDidMount()

        if(typeof page.onDidMount !== "undefined") {
          page.onDidMount(this.getContext())
        }
      }

      getContext(): KiwiBundlePageFunctionsContext {
        return {
          state: this.state,
          values: page.values || {},
          setState: this.setState.bind(this),
          props: this.props,
          params: this.params,
        }
      }

      render() {
        return page.render(Object.assign(this.getContext(), { params: this.params, theme }))
      }
    }
  }

  Component<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState>(component: KiwiBundleComponent<Props, Options["theme"]>) {
    const theme = this.options.theme
    return class Component extends ComponentBase<Props, State> {
      render() {
        return component.render({ props: this.props, theme, style: this.state.style })
      }
    }
  }

  Layout<Props extends ComponentProps = {}, State extends ComponentState = any>(layout: KiwiBundleComponent<Props, Options["theme"]>) {
    const theme = this.options.theme
    return class Layout extends ComponentBase<Props, State> {
      render() {
        return layout.render({ props: this.props, theme, style: this.state.style })
      }
    }
  }

  Render<Routes extends KeysObject<KiwiBundleReactRender, Options["routes"]>>(routes: Routes): void {
    Renderer(this, routes)
  }
}
