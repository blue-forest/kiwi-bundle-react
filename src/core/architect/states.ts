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
  return <States extends Required<States>>(states: States) => {
    options.cache.states = states
    type Stores = ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, EmptyStores>
    return {
      values: ArchitectValues(options),
      functions: ArchitectFunctions(options),
      stores: ArchitectStores(options),
      onInit: ArchitectOnInit(options),
      onMount: ArchitectOnMount(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    } as ArchitectStatesSelf<Config, Links, Props, Style, States, Values, Functions, Stores>
  }
}
