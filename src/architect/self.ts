import { AppComponentProps, AppComponentStates, AppConfig } from "../core/app"
import { AppLinksImports } from "../core/links"
import { AppStyleSheet } from "../core/styles"
import { ArchitectRender } from "./render"
import { ArchitectStyle } from "./style"

export type Self<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet = {},
  Stores = {},
  States extends AppComponentStates = {},
  Values = {},
  Functions = {},
  > = {
    style: ArchitectStyle<Config, Links, Props, Style, Stores, States, Values, Functions>
    stores?: any
    states?: any
    values?: any
    functions?: any
    onInit?: any
    onMount?: any
    onUnmount?: any
    render: ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions>
  }
