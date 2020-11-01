import { AppComponentProps, AppComponentStates, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
//import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectRender } from "./render"
import { ArchitectStates } from "./states"
//import { ArchitectStores } from "./stores"
import { ArchitectStyle } from "./style"
//import { ArchitectValues } from "./values"

export type ArchitectSelf<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet = any,
  Stores = {},
  States extends AppComponentStates = {},
  Values = {},
  Functions = {},
  > = {
    style: ArchitectStyle<Config, Links, Props, Style, Stores, States, Values, Functions>
    //stores: ArchitectStores<Config, Links, Props, Style, Stores, States, Values, Functions>
    states: ArchitectStates<Config, Links, Props, Style, Stores, States, Values, Functions>
    //values: ArchitectValues<Config, Links, Props, Style, Stores, States, Values, Functions>
    //functions: ArchitectFunctions<Config, Links, Props, Style, Stores, States, Values, Functions>
    onInit: ArchitectOnInit<Config, Links, Props, Style, Stores, States, Values, Functions>
    onMount: ArchitectOnMount<Config, Links, Props, Style, Stores, States, Values, Functions>
    onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, Stores, States, Values, Functions>
    render: ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions>
  }
