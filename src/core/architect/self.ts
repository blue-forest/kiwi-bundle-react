import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStyle,
  ArchitectComponentValues,
} from "./component"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectRender } from "./render"
import { ArchitectStates } from "./states"
import { ArchitectStyle } from "./style"
import { ArchitectValues } from "./values"

export type ArchitectSelf<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, Values, Functions> = any,
  > = {
    style: ArchitectStyle<Config, Links, Props, Style, States, Values, Functions>
    states: ArchitectStates<Config, Links, Props, Style, States, Values, Functions>
    values: ArchitectValues<Config, Links, Props, Style, States, Values, Functions>
    functions: ArchitectFunctions<Config, Links, Props, Style, States, Values, Functions>
    onInit: ArchitectOnInit<Config, Links, Props, Style, States, Values, Functions>
    onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions>
    onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions>
    render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions>
  }
