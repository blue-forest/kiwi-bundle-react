import { Theme } from "@react-navigation/native"
import { ReactNative } from "../vendors"
import { AppComponent, AppComponentProps, AppComponentStates, AppConfig } from "./app"
import { AppLinksImports } from "./links"
import { AppStyleSheet } from "./styles"

export type ArchitectContext<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = {
    appearance: {
      colors: Config["appearance"]["colors"]
      theme: {
        get: () => keyof Links["themes"] | undefined
        set: (theme: keyof Links["themes"]) => void
        colors: Theme["colors"],
        scheme: {
          get: () => ReactNative.ColorSchemeName
          set: (scheme: ReactNative.ColorSchemeName) => void
        }
      }
    }
    props: Props
    style: Style
    stores: Stores
    state: {
      get: { [name in keyof States]: States[keyof States] }
      set: { [name in keyof States]: (v: States[keyof States]) => void }
    }
    values: Values
    functions: Functions
    OS: ReactNative.PlatformOSType
    navigation: {
      push: (route: keyof Config["navigation"]["routes"], params?: { [key: string]: string }) => void
    }
  }

export type ArchitectStyle = AppStyleSheet

export type ArchitectStores = any

export type ArchitectStates = any

export type ArchitectValues = any

export type ArchitectFunctions = any

export type ArchitectOnInit = any

export type ArchitectRender<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = (
    render: (
      context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
    ) => React.ReactElement
  ) => AppComponent<Props>

export type ArchitectOnMount<
  Props extends AppComponentProps
  > = (render: (context: any) => React.ReactElement) => AppComponent<Props>

export type ArchitectOnUnmount<
  Props extends AppComponentProps
  > = (render: (context: any) => React.ReactElement) => AppComponent<Props>

export type ArchitectSelf<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet = {},
  Stores = {},
  States extends AppComponentStates = {},
  Values = {},
  Functions = {},
  > = {
    style?: any
    stores?: any
    states?: any
    values?: any
    functions?: any
    onInit?: any
    onMount?: any
    onUnmount?: any
    render: ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions>
  }
