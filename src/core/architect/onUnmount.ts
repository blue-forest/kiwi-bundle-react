import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
  ArchitectComponentStates,
  ArchitectComponentFunctions,
  ArchitectComponentStores,
  ArchitectComponentValues,
} from "./component"
import { ArchitectContext } from "./context"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectOnUnmount<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>,
  > = (
    onUnmount: (
      context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions, Stores>
    ) => void
  ) => Omit<ArchitectSelf<Config, Links, Props, Style, States, Values, Functions, Stores>,
    "style" | "states" | "values" | "functions" | "stores" | "onInit" | "onMount" | "onUnmount"
  >

export const ArchitectOnUnmount = <
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
  ): ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions, Stores> => {
  return onUnmount => {
    options.cache.onUnmount = onUnmount
    return {
      render: ArchitectRender(options),
    }
  }
}
