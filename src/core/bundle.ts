import * as React from "react"
import { KeysObject } from "dropin-recipes"
import { Page as PageBase, Component as ComponentBase, ComponentProps, ComponentState } from "./components"
import { Router } from "./router/Router"
import { Route } from "./router/Route"
import { StyleSheetData } from "./styles"
import { Renderer } from "./client/Renderer"

export interface KiwiBundleTheme<Data extends KiwiBundleTheme<Data> = any> {
  sizes: KeysObject<Data["sizes"], number>
  colors?: KeysObject<Data["colors"], string>
  fonts?: WebFont.Config
  css?: { [rule: string]: string }
}

interface KiwiBundleValues<Data extends KiwiBundleValues<Data>> {
  routes: KeysObject<Data["routes"], string>
  theme: KiwiBundleTheme<Data["theme"]>
}

interface KiwiBundlePage<Params, Theme> {
  render(data: { params: Params, theme: Theme }): React.ReactNode
}

interface KiwiBundleComponent<Props, Theme> {
  render(data: { props: Props, theme: Theme, style?: React.CSSProperties }): React.ReactNode
}

export class KiwiBundle<Values extends KiwiBundleValues<Values>> {
  private values: Values

  constructor(values: Values) {
    this.values = values
  }

  StyleSheet<Data extends StyleSheetData<Data>>(style: (theme: Values["theme"]) => Data): Data {
    return style(this.values.theme)
  }

  Page<Params = {}>(page: KiwiBundlePage<Params, Values["theme"]>) {
    const theme = this.values.theme
    return class Page extends PageBase<Params> {
      render() {
        return page.render({ params: this.params, theme })
      }
    }
  }

  Component<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState>(component: KiwiBundleComponent<Props, Values["theme"]>) {
    const theme = this.values.theme
    return class Component extends ComponentBase<Props, State> {
      render() {
        return component.render({ props: this.props, theme, style: this.state.style })
      }
    }
  }

  Layout<Props extends ComponentProps = {}, State extends ComponentState = any>(layout: KiwiBundleComponent<Props, Values["theme"]>) {
    const theme = this.values.theme
    return class Layout extends ComponentBase<Props, State> {
      render() {
        return layout.render({ props: this.props, theme, style: this.state.style })
      }
    }
  }

  Router<Routes extends KeysObject<Values["routes"], any>>(routes: Routes) {
    return new Router(Object.keys(routes).map(route => {
      return new Route((this.values.routes as any)[route], (routes as any)[route])
    }))
  }

  Client(router: Router): void {
    Renderer(router, this.values.theme)
  }
}
