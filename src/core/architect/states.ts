import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
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
import { ArchitectValues } from "./values"

export type ArchitectStatesSelf<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
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
  > = <States extends Required<States>>(
    states: States,
  ) => ArchitectStatesSelf<Config, Links, Props, Style, States, Values, Functions>

export const ArchitectStates = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  _ extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, any, Values, Functions>
  ) => {
  return <States extends Required<States>>(states: States) => {
    options.cache.states = states
    return {
      values: ArchitectValues<Config, Links, Props, Style, States, Values, Functions>(options),
      functions: ArchitectFunctions<Config, Links, Props, Style, States, Values, Functions>(options),
      onInit: ArchitectOnInit<Config, Links, Props, Style, States, Values, Functions>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions>(options),
    }
  }
}
