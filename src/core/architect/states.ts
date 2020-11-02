import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
  ArchitectComponentStores,
  ArchitectComponentValues,
  ArchitectComponentFunctions,
} from "./component"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectValues } from "./values"

export type ArchitectStates<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  Stores extends ArchitectComponentStores,
  EmptyStates extends {},
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = <States extends Required<States>>(states: States) => Omit<ArchitectSelf<Config, Links, Props, Style, Stores, States, Values, Functions>,
    "style" | "stores" | "states"
  >

export const ArchitectStates = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  Stores extends ArchitectComponentStores = {},
  EmptyState = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  >(
    options: ArchitectOptions<Config, Links, Props, Style, Stores, any, Values, Functions>
  ): ArchitectStates<Config, Links, Props, Style, Stores, EmptyState, Values, Functions> => {
  return <States extends Required<States>>(states: States) => {
    options.cache.states = states
    return {
      values: ArchitectValues<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      functions: ArchitectFunctions<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      onInit: ArchitectOnInit<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
    }
  }
}
