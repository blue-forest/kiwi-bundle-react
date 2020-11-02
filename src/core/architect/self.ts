import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStores,
  ArchitectComponentStyle,
  ArchitectComponentValues,
} from "./component"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectRender } from "./render"
import { ArchitectStates } from "./states"
import { ArchitectStores } from "./stores"
import { ArchitectStyle } from "./style"
import { ArchitectValues } from "./values"

export type ArchitectSelf<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  Stores extends ArchitectComponentStores = {},
  > = {
    style: ArchitectStyle<Config, Links, Props, Style, States, Values, Functions, Stores>
    states: ArchitectStates<Config, Links, Props, Style, States, Values, Functions, Stores>
    values: ArchitectValues<Config, Links, Props, Style, States, Values, Functions, Stores>
    functions: ArchitectFunctions<Config, Links, Props, Style, States, Values, Functions, Stores>
    stores: ArchitectStores<Config, Links, Props, Style, States, Values, Functions, Stores>
    onInit: ArchitectOnInit<Config, Links, Props, Style, States, Values, Functions, Stores>
    onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions, Stores>
    onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions, Stores>
    render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions, Stores>
  }
