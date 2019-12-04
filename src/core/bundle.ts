import { KeysObject } from "dropin-recipes"
import { Client } from "./client/Client"
import { Page, PageConstructor, Component, KiwiBundlePage, KiwiBundleComponent } from "./components"
import { Router } from "./router/Router"
import { Route } from "./router/Route"
import { StyleSheetData } from "./styles"

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
    return class extends Page<Params> {
      render() {
        return page.render({ params: this.params })
      }
    }
  }

  Component<Props = {}>(page: KiwiBundleComponent<Props>) {
    return class extends Component<Props> {
      render() {
        return page.render({ props: this.props })
      }
    }
  }

  Layout<Props = {}>(layout: KiwiBundleComponent<Props>) {
    return this.Component<Props>(layout)
  }

  Router<Routes extends KeysObject<Values["routes"], PageConstructor>>(routes: Routes) {
    return new Router(Object.keys(routes).map(route => {
      return new Route((this.values.routes as any)[route], (routes as any)[route])
    }))
  }

  Client(router: Router): void {
    Client(router, this.values.theme)
  }
}
