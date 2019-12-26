import * as React from "react"
import { KeysObject } from "dropin-recipes"
import { Page as PageBase, Component as ComponentBase, ComponentProps, ComponentState } from "./components"
import { Router } from "./router/Router"
import { Route } from "./router/Route"
import { StyleSheetData } from "./styles"
import { Renderer } from "./client/Renderer"
import { Values } from "./values/Values"
import { Config as WebFontConfig } from "webfontloader"

export interface KiwiBundleTheme<Data extends KiwiBundleTheme<Data> = any> {
  sizes: KeysObject<Data["sizes"], number>
  colors?: KeysObject<Data["colors"], string>
  fonts?: WebFontConfig
  css?: { [rule: string]: string }
}

interface KiwiBundleOptions<Data extends KiwiBundleOptions<Data>> {
  routes: KeysObject<Data["routes"], string>
  theme: KiwiBundleTheme<Data["theme"]>
}

interface KiwiBundlePage<Params, Theme> {
  render(data: { params: Params, theme: Theme }): React.ReactNode
}

interface KiwiBundleComponent<Props, Theme> {
  render(data: { props: Props, theme: Theme, style?: React.CSSProperties }): React.ReactNode
}

export class KiwiBundle<Options extends KiwiBundleOptions<Options>> {
  private options: Options

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
      render() {
        return page.render({ params: this.params, theme })
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

  Router<Routes extends KeysObject<Options["routes"], any>>(routes: Routes) {
    return new Router(Object.keys(routes).map(route => {
      return new Route((this.options.routes as any)[route], (routes as any)[route])
    }))
  }

  Client(router: Router): void {
    Renderer(router, this.options.theme)
  }
}
