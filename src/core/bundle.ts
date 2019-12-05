import { KeysObject } from "dropin-recipes"
import { Page as PageBase, Component as ComponentBase, KiwiBundlePage,
  KiwiBundleComponent, ComponentProps, ComponentState } from "./components"
import { Router } from "./router/Router"
import { Route } from "./router/Route"
import { StyleSheetData } from "./styles"
import { Client } from "./client/Client"

export interface KiwiBundleTheme<Data extends KiwiBundleTheme<Data> = any> {
  sizes: KeysObject<Data["sizes"], number>
  colors: KeysObject<Data["colors"], string>
}

interface KiwiBundleValues<Data extends KiwiBundleValues = any> {
  routes: KeysObject<Data["routes"], string>
  theme: KiwiBundleTheme<Data["theme"]>,
}

export class KiwiBundle<Values extends KiwiBundleValues<Values>> {
  private values: Values

  constructor(values: Values) {
    this.values = values
  }

  StyleSheet<Data extends StyleSheetData<Data>>(style: (theme: Values["theme"]) => Data): Data {
    return style(this.values.theme)
  }

  Page<Params = {}>(page: KiwiBundlePage<Params>) {
    return class Page extends PageBase<Params> {
      render() {
        return page.render({ params: this.params })
      }
    }
  }

  Component<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState>(component: KiwiBundleComponent<Props>) {
    return class Component extends ComponentBase<Props, State> {
      render() {
        return component.render({ props: this.props })
      }
    }
  }

  Layout<Props extends ComponentProps = {}, State extends ComponentState = {}>(layout: KiwiBundleComponent<Props>) {
    return class Layout extends this.Component<Props, State>(layout) {
      render() {
        return layout.render({ props: this.props })
      }
    }
  }

  Router<Routes extends KeysObject<Values["routes"], any>>(routes: Routes) {
    return new Router(Object.keys(routes).map(route => {
      return new Route((this.values.routes as any)[route], (routes as any)[route])
    }))
  }

  Client(router: Router): void {
    Client(router, this.values.theme)
  }
}
