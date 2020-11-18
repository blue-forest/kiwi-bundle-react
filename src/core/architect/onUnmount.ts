import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
  ArchitectComponentStates,
  ArchitectComponentFunctions,
  ArchitectComponentValues,
  ArchitectComponentStores,
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
  Stores extends ArchitectComponentStores,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions
  > = (
    onUnmount: (
      context: ArchitectContext<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        Functions
      >,
    ) => void,
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Stores, Values, Functions>,
    | "style"
    | "states"
    | "values"
    | "functions"
    | "onInit"
    | "onMount"
    | "onUpdate"
    | "onUnmount"
  >

export const ArchitectOnUnmount = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Stores extends ArchitectComponentStores,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions
>(
  options: ArchitectOptions<
    Config,
    Links,
    Props,
    Style,
    States,
    Stores,
    Values,
    Functions
  >,
): ArchitectOnUnmount<
  Config,
  Links,
  Props,
  Style,
  States,
  Stores,
  Values,
  Functions
> => {
  return (onUnmount) => {
    options.cache.onUnmount = onUnmount
    return {
      render: ArchitectRender(options),
    }
  }
}
