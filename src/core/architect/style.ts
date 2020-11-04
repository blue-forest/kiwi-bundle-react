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

type ArchitectStyleSelf<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
    "style"
  >

export type ArchitectStyle<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = <Style extends ArchitectComponentStyle>(
    style: Style,
  ) => ArchitectStyleSelf<Config, Links, Props, Style, States, Values, Functions>

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
  ) => {
  return <Style extends EmptyStyle>(style: Style): ArchitectStyleSelf<Config, Links, Props, Style, States, Values, Functions> => {
    options.context.style = style
    return {
      states: ArchitectStates<Config, Links, Props, Style, States, Values, Functions>(options),
      values: ArchitectValues<Config, Links, Props, Style, States, Values, Functions>(options),
      functions: ArchitectFunctions<Config, Links, Props, Style, States, Values, Functions>(options),
      onInit: ArchitectOnInit<Config, Links, Props, Style, States, Values, Functions>(options),
      onMount: ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, Style, States, Values, Functions>(options),
    }
  }
}
