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
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectStores<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  Stores extends ArchitectComponentStores,
  > = (stores: Stores) => Omit<ArchitectSelf<Config, Links, Props, Style, States, Values, Functions, Stores>,
    "style" | "states" | "values" | "functions" | "stores"
  >

export const ArchitectStores = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  Stores extends ArchitectComponentStores = {},
  >(
    options: ArchitectOptions<Config, Links, Props, Style, States, Values, Functions, Stores>
  ): ArchitectStores<Config, Links, Props, Style, States, Values, Functions, Stores> => {
  return () => {
    return {
      onInit: ArchitectOnInit<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
    }
  }
}
