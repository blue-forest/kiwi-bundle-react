import * as React from "react"
import { KeysObject } from "dropin-recipes"
import { Page as PageBase, Component as ComponentBase, ComponentProps, PageConstructor, Component, PageProps, Page } from "./components"
import { Config as WebFontConfig } from "webfontloader"
import { Router } from "./client/router"
import { StyleSheetData } from "./styles"
import { Renderer } from "./client/Renderer"
import { Values } from "./values/Values"
import { Architect } from "./client/Architect"
import { logger } from "./client/logger"

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

interface KiwiBundleReactContextComponentObject<Props, State, Values, Options extends KiwiBundleReactOptions> {
  props: Props
  state: State
  setState: (state: {} | ((prevState: Readonly<State>, props: Readonly<Props>) => void)) => void
  values: Values
  routes: Options["routes"]
  sizes: Options["theme"]["sizes"]
  colors: Options["theme"]["colors"]
}

interface KiwiBundleReactContextComponent<Props = ComponentProps, State = KeysObject<any>, Values = KeysObject<any>, Options extends KiwiBundleReactOptions = KiwiBundleReactOptions> {
  props?: Props
  state?: State
  values?: Values
  functions?: { [key: string]: (context: KiwiBundleReactContextComponentObject<Props, State, Values, Options>) => any }
  init?(context: KiwiBundleReactContextComponentObject<Props, State, Values, Options>): void
  onDidMount?(context: KiwiBundleReactContextComponentObject<Props, State, Values, Options>): void
  render(context: KiwiBundleReactContextComponentObject<Props, State, Values, Options>): React.ReactNode
}

interface KiwiBundleReactContextPageObject<Params = KeysObject<any>, State = KeysObject<any>, Values = KeysObject<any>, Options extends KiwiBundleReactOptions = KiwiBundleReactOptions> extends KiwiBundleReactContextComponent<PageProps<Params>, State, Values, Options> {
  params: Params
}

interface KiwiBundleReactContextPage<Params = KeysObject<any>, State = KeysObject<any>, Values = KeysObject<any>, Options extends KiwiBundleReactOptions = KiwiBundleReactOptions> {
  state?: State
  values?: Values
  functions?: { [key: string]: (context: KiwiBundleReactContextPageObject<Params, State, Values, Options>) => any }
  init?(context: KiwiBundleReactContextPageObject<Params, State, Values, Options>): void
  onDidMount?(context: KiwiBundleReactContextPageObject<Params, State, Values, Options>): void
  render(context: KiwiBundleReactContextPageObject<Params, State, Values, Options>): React.ReactNode
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

  Component<Props extends ComponentProps = ComponentProps, State = KeysObject<any>, Values = KeysObject<any>>(component: KiwiBundleReactContextComponent<Props, State, Values, Options>) {
    const getContext = (instance: Component<Props, State>): KiwiBundleReactContextComponentObject<Props, State, Values, Options> => ({
      props: instance.props,
      state: instance.state,
      setState: instance.setState.bind(instance),
      values: component.values || {},
      routes: this.options.routes,
      sizes: this.options.theme.sizes,
      colors: this.options.theme.colors,
    })
    return class extends Component<Props, State> {
      constructor(props: any) {
        super(props)
        if(typeof component.init !== "undefined") component.init(getContext(this))
      }
      componentDidMount() {
        super.componentDidMount()
        if(typeof component.onDidMount !== "undefined") component.onDidMount(getContext(this))
      }
      render() {
        return component.render(getContext(this))
      }
    }
  }

  Layout<Props extends ComponentProps = ComponentProps, State = KeysObject<any>, Values = KeysObject<any>>(layout: KiwiBundleReactContextComponent<Props, State, Values, Options>) {
    return this.Component<Props, State, Values>(layout)
  }

  Page<Params = KeysObject<any>, State = KeysObject<any>, Values = KeysObject<any>>(page: KiwiBundleReactContextPage<Params, State, Values, Options>) {
    const getContext = (instance: Page<Params, State>): KiwiBundleReactContextComponentObject<PageProps<Params>, State, Values, Options> => ({
      state: instance.state,
      setState: instance.setState.bind(instance),
      values: page.values || {},
      routes: this.options.routes,
      sizes: this.options.theme.sizes,
      colors: this.options.theme.colors,
    })
    return class extends Page<Params, State> {
      constructor(props: any) {
        super(props)
        if(typeof page.init !== "undefined") page.init(getContext(this))
      }
      componentDidMount() {
        super.componentDidMount()
        if(typeof page.onDidMount !== "undefined") page.onDidMount(getContext(this))
      }
      render() {
        return page.render(getContext(this))
      }
    }
  }

  Render<Routes extends KeysObject<PageConstructor | string, Options["routes"]>>(routes: Routes): void {
    Renderer(this.options, routes)
  }
}
