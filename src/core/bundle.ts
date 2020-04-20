import * as React from "react"
import { KeysObject } from "dropin-recipes"
import { Page as PageBase, Component as ComponentBase, ComponentProps, ComponentState, PageConstructor } from "./components"
import { Router } from "./router/Router"
import { Route } from "./router/Route"
import { StyleSheetData } from "./styles"
import { Renderer } from "./client/Renderer"
import { Values } from "./values/Values"
import { Config as WebFontConfig } from "webfontloader"

export interface KiwiBundleTheme<Data extends KiwiBundleTheme<Data> = any> {
  sizes: KeysObject<number, Data["sizes"]>
  colors?: KeysObject<string, Data["colors"]>
  fonts?: WebFontConfig
  css?: { [rule: string]: string }
}

interface KiwiBundleOptions<Data extends KiwiBundleOptions<Data>> {
  routes: KeysObject<Data["routes"], string>
  theme: KiwiBundleTheme<Data["theme"]>
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

export enum KiwiBundlePageAuthLevels {
  USER = "user",
  ANONYMOUS = "anonymous"
}

interface KiwiBundlePage<Params, Theme> {
  values: KiwiBundlePageValues
  functions: { [key: string]: (context: KiwiBundlePageFunctionsContext) => any }
  authLevels?: KiwiBundlePageAuthLevels[]
  init?(context: KiwiBundlePageFunctionsContext): void
  onDidMount?(context: KiwiBundlePageFunctionsContext): void
  render(context: KiwiBundlePageFunctionsContext & { theme: Theme }): React.ReactNode
}

interface KiwiBundleComponent<Props, Theme> {
  values: { [key: string]: any }
  state: { [key: string]: any }
  render(context: { props: Props, theme: Theme } & { style?: React.CSSProperties }): React.ReactNode
}

export class KiwiBundle<Options extends KiwiBundleOptions<Options>> {
  private options: Options
  private router?: Router

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

        if (typeof page.init !== "undefined") {
          page.init(this.getContext())
        }
      }

      componentDidMount() {
        super.componentDidMount()

        if (typeof page.onDidMount !== "undefined") {
          page.onDidMount(this.getContext())
        }
      }

      getContext(): KiwiBundlePageFunctionsContext {
        return {
          state: this.state,
          values: page.values,
          setState: this.setState.bind(this),
          props: this.props,
          params: this.params,
        }
      }

      render() {
        return page.render(Object.assign(this.getContext(), {
          params: this.params,
          theme
        }))
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

  Router<Routes extends KeysObject<Options["routes"], PageConstructor>>(routes: Routes): Router {
    return new Router(Object.keys(routes).map(route => {
      return new Route((this.options.routes as any)[route], (routes as any)[route])
    }))
  }

  Client(router: Router): void {
    this.router = router
    Renderer(this.router, this.options.theme)
  }
}
