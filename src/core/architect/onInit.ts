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
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>,
  > = Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Values, Functions, Stores>,
    "style" | "states" | "values" | "functions" | "stores" | "onInit"
  >

type ArchitectOnInitCallback<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>,
  > = (
    context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions, Stores>
  ) => void

export type ArchitectOnInit<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>,
  > = (
    onInit: ArchitectOnInitCallback<Config, Links, Props, Style, States, Values, Functions, Stores>
  ) => ArchitectOnInitSelf<Config, Links, Props, Style, States, Values, Functions, Stores>

export const ArchitectOnInit = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores> = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, States, Values, Functions, Stores>
  ) => {
  return (
    onInit: ArchitectOnInitCallback<Config, Links, Props, Style, States, Values, Functions, Stores>,
  ): ArchitectOnInitSelf<Config, Links, Props, Style, States, Values, Functions, Stores> => {
    options.cache.onInit = onInit
    return {
      onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
    }
  }
}
