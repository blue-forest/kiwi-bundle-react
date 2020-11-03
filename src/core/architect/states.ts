import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
  ArchitectComponentStores,
  ArchitectComponentValues,
  ArchitectComponentFunctions,
  ArchitectComponentStates,
} from "./component"
import { ArchitectFunctions } from "./functions"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStores } from "./stores"
import { ArchitectValues } from "./values"

export type ArchitectStatesSelf<
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
    "style" | "states"
  >

export type ArchitectStates<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  EmptyStates extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  EmptyStores extends ArchitectComponentStores<Config, Links, Props, Style, EmptyStates, Values, Functions, EmptyStores>,
  > = <
    States extends Required<States>,
    Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>
    >(
    states: States,
  ) => ArchitectStatesSelf<Config, Links, Props, Style, States, Values, Functions, Stores>

export const ArchitectStates = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  EmptyStates extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  EmptyStores extends ArchitectComponentStores<Config, Links, Props, Style, EmptyStates, Values, Functions, EmptyStores> = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, any, Values, Functions, any>
  ) => {
  return <
    States extends Required<States>,
    Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>
  >(states: States): ArchitectStatesSelf<Config, Links, Props, Style, States, Values, Functions, Stores> => {
    options.cache.states = states
    return {
      values: ArchitectValues<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      functions: ArchitectFunctions<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      stores: ArchitectStores<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      onInit: ArchitectOnInit<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
      render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions, Stores>(options),
    }
  }
}
