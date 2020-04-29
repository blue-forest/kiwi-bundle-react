import * as React from "react"
import { KeysObject } from "dropin-recipes"
import { Page as PageBase, Component as ComponentBase, ComponentProps, ComponentState, PageConstructor } from "./components"
import { Config as WebFontConfig } from "webfontloader"
import { Router } from "./router"
import { StyleSheetData } from "./styles"
import { Renderer } from "./client/Renderer"
import { Values } from "./values/Values"

export interface KiwiBundleReactTheme<Data extends KiwiBundleReactTheme<Data> = any> {
  sizes?: KeysObject<number, Data["sizes"]>
  colors?: KeysObject<string, Data["colors"]>
  fonts?: WebFontConfig
  css?: { [rule: string]: string | number }
}

export interface KiwiBundleReactOptions<Data extends KiwiBundleReactOptions<Data> = { routes: KeysObject<string>, theme: KiwiBundleReactTheme }> {
  routes: KeysObject<string, Data["routes"]>
  theme: KiwiBundleReactTheme<Data["theme"]>
}

interface KiwiBundleReactComponentContext<Options extends KiwiBundleReactOptions> {
  options: Options
  props: KeysObject<any>
  values: KeysObject<any>
  state: KeysObject<any>
  setState: (state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => void)) => void
}

interface KiwiBundleReactComponent<Props, State, Values, Options extends KiwiBundleReactOptions> {
  state?: State
  values?: Values
  functions?: { [key: string]: (context: KiwiBundleReactComponentContext<Options>) => any }
  init?(context: KiwiBundleReactComponentContext<Options>): void
  onDidMount?(context: KiwiBundleReactComponentContext<Options>): void
  render(context: KiwiBundleReactComponentContext<Options>): React.ReactNode
}

interface KiwiBundleReactPage<Params, State, Values, Options extends KiwiBundleReactOptions> extends KiwiBundleReactComponent<{}, State, Values, Options> {
}

export class KiwiBundleReact<Options extends KiwiBundleReactOptions<Options> = KiwiBundleReactOptions> {
  private options: Options
  private router = new Router()

  constructor(options: Options) {
    this.options = options
  }

  Values<Data extends Values<Data, any>>(values: (theme: Options["theme"]) => Data): Data {
    return values(this.options.theme)
  }

  StyleSheet<Data extends StyleSheetData<Data>>(style: (theme: Options["theme"]) => Data): Data {
    return style(this.options.theme)
  }

  Page<Params = {}, State = {}, Values = {}>(page: KiwiBundleReactPage<Params, State, Values, Options>) {
    const options = this.options
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

      getContext(): KiwiBundleReactComponentContext<Options> {
        return {
          state: this.state,
          values: page.values || {},
          setState: this.setState.bind(this),
          options,
          props: this.props,
          // params: this.params,
        }
      }

      render() {
        return page.render(Object.assign(this.getContext(), { params: this.params, theme: options.theme }))
      }
    }
  }

  Component<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState, Values = {}>(component: KiwiBundleReactComponent<Props, State, Values, Options>) {
    const options = this.options
    return class Component extends ComponentBase<Props, State> {
      constructor(props: Props) {
        super(props)
        if(typeof component.state !== "undefined") {
          this.state = component.state
        }
      }
      render() {
        return component.render({
          state: this.state,
          values: component.values || {},
          setState: this.setState.bind(this),
          options,
          props: this.props,
        })
      }
    }
  }

  Layout<Props extends ComponentProps = ComponentProps, State extends ComponentState = ComponentState, Values = {}>(layout: KiwiBundleReactComponent<Props, State, Values, Options>) {
    return this.Component<Props, State, Values>(layout)
  }

  Render<Routes extends KeysObject<PageConstructor | string, Options["routes"]>>(routes: Routes): void {
    Renderer(this.options, routes)
  }
}
