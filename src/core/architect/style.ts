import { AppLinksImports } from "../app/links"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStates } from "./states"
import { ArchitectOptions } from "./options"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectStores } from "./stores"
import { ArchitectValues } from "./values"
import { ArchitectFunctions } from "./functions"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStores,
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
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>,
  > = Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Values, Functions, Stores>,
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
  Stores extends ArchitectComponentStores<Config, Links, Props, Style, States, Values, Functions, Stores>,
  > = <Style extends ArchitectComponentStyle>(style: Style)
    => ArchitectStyleSelf<Config, Links, Props, Style, States, Values, Functions, Stores>

export const ArchitectStyle = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  EmptyStyle extends ArchitectComponentStyle = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  EmptyStores extends ArchitectComponentStores<Config, Links, Props, EmptyStyle, States, Values, Functions, EmptyStores> = any,
  >(
    options: ArchitectOptions<Config, Links, Props, any, States, Values, Functions, EmptyStores>
  ) => {
  return <Style extends EmptyStyle, Stores extends EmptyStores>(style: Style):
    ArchitectStyleSelf<Config, Links, Props, Style, States, Values, Functions, Stores> => {
    options.context.style = style
    return {
      states: ArchitectStates(options),
      values: ArchitectValues(options),
      functions: ArchitectFunctions(options),
      stores: ArchitectStores(options),
      onInit: ArchitectOnInit(options),
      onMount: ArchitectOnMount(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
