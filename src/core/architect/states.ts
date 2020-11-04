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
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
    "style" | "states"
  >

export const ArchitectStates = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  EmptyStates extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, any, Values, Functions>
  ): ArchitectStates<Config, Links, Props, Style, EmptyStates, Values, Functions> => {
  return states => {
    options.cache.states = states
    return {
      values: ArchitectValues(options),
      functions: ArchitectFunctions(options),
      onInit: ArchitectOnInit(options),
      onMount: ArchitectOnMount(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
