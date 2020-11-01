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
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStates } from "./states"
import { ArchitectValues } from "./values"

export type ArchitectStores<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  Stores extends ArchitectComponentStores,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = (stores: Stores) => Omit<ArchitectSelf<Config, Links, Props, Style, Stores, States, Values, Functions>,
    "style" | "stores"
  >

export const ArchitectStores = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  Stores extends ArchitectComponentStores = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  >(
    options: ArchitectOptions<Config, Links, Props, Style, Stores, States, Values, Functions>
  ): ArchitectStores<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return () => {
    return {
      states: ArchitectStates<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      values: ArchitectValues<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      functions: ArchitectFunctions<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      onInit: ArchitectOnInit<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
    }
  }
}
