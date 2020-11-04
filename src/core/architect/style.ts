import { AppLinksImports } from "../app/links"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStates } from "./states"
import { ArchitectOptions } from "./options"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectValues } from "./values"
import { ArchitectFunctions } from "./functions"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStyle,
  ArchitectComponentValues
} from "./component"
import { AppConfig } from "../app/config"

export type ArchitectStyle<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  EmptyStyle extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = <Style extends EmptyStyle>(
    style: Style,
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
    "style"
  >

export const ArchitectStyle = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  EmptyStyle extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions = any,
  >(
    options: ArchitectOptions<Config, Links, Props, any, States, Values, Functions>
  ): ArchitectStyle<Config, Links, Props, EmptyStyle, States, Values, Functions> => {
  return style => {
    options.context.style = style
    return {
      states: ArchitectStates(options),
      values: ArchitectValues(options),
      functions: ArchitectFunctions(options),
      onInit: ArchitectOnInit(options),
      onMount: ArchitectOnMount(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
