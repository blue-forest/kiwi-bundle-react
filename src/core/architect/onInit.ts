import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStyle,
  ArchitectComponentValues,
} from "./component"
import { ArchitectContext } from "./context"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

type ArchitectOnInitSelf<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
    "style" | "states" | "values" | "functions" | "onInit"
  >

type ArchitectOnInitCallback<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = (
    context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions>
  ) => void

export type ArchitectOnInit<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = (
    onInit: ArchitectOnInitCallback<Config, Links, Props, Style, States, Values, Functions>
  ) => ArchitectOnInitSelf<Config, Links, Props, Style, States, Values, Functions>

export const ArchitectOnInit = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, States, Values, Functions>
  ) => {
  return (
    onInit: ArchitectOnInitCallback<Config, Links, Props, Style, States, Values, Functions>,
  ): ArchitectOnInitSelf<Config, Links, Props, Style, States, Values, Functions> => {
    options.cache.onInit = onInit
    return {
      onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions>(options),
    }
  }
}
