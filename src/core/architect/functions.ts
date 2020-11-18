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
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOnUpdate } from "./onUpdate"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectFunctions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Stores extends ArchitectComponentStores,
  Values extends ArchitectComponentValues
  > = <Functions extends ArchitectComponentFunctions>(
    functions: (
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
    ) => Functions,
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Stores, Values, Functions>,
    "style" | "states" | "values" | "functions"
  >

export const ArchitectFunctions = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Stores extends ArchitectComponentStores,
  Values extends ArchitectComponentValues
>(
  options: ArchitectOptions<
    Config,
    Links,
    Props,
    Style,
    States,
    Stores,
    Values
  >,
): ArchitectFunctions<Config, Links, Props, Style, States, Stores, Values> => {
  return <Functions extends ArchitectComponentFunctions>(
    functions: (
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
    ) => Functions,
  ) => {
    options.cache.functions = functions
    return {
      onInit: ArchitectOnInit<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        Functions
      >(options),
      onMount: ArchitectOnMount<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        Functions
      >(options),
      onUpdate: ArchitectOnUpdate<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        Functions
      >(options),
      onUnmount: ArchitectOnUnmount<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        Functions
      >(options),
      render: ArchitectRender<
        Config,
        Links,
        Props,
        Style,
        States,
        Stores,
        Values,
        Functions
      >(options),
    }
  }
}
