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

export type ArchitectStyle<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  Stores extends ArchitectComponentStores,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = <S extends Style>(style: S) => Omit<ArchitectSelf<Config, Links, Props, S, Stores, States, Values, Functions>,
    "style"
  >

export const ArchitectStyle = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = {},
  Stores extends ArchitectComponentStores = {},
  States extends ArchitectComponentStates = {},
  Values extends ArchitectComponentValues = {},
  Functions extends ArchitectComponentFunctions = {},
  >(
    options: ArchitectOptions<Config, Links, Props, any, Stores, States, Values, Functions>
  ): ArchitectStyle<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return <S extends Style>(style: S) => {
    options.context.style = style
    return {
      states: ArchitectStates<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      stores: ArchitectStores<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      values: ArchitectValues<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      functions: ArchitectFunctions<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      onInit: ArchitectOnInit<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      onMount: ArchitectOnMount<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, S, Stores, States, Values, Functions>(options),
    }
  }
}
