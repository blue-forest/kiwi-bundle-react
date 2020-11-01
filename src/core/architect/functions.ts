import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { ArchitectComponentFunctions, ArchitectComponentProps, ArchitectComponentStates, ArchitectComponentStores, ArchitectComponentStyle, ArchitectComponentValues } from "./component"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectFunctions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  Stores extends ArchitectComponentStores,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = () => Omit<ArchitectSelf<Config, Links, Props, Style, Stores, States, Values, Functions>,
    "style" | "stores" | "states" | "values" | "functions"
  >

export const ArchitectFunctions = <
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
  ): ArchitectFunctions<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return () => {
    return {
      onInit: ArchitectOnInit<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
    }
  }
}
