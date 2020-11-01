import { AppComponentProps, AppComponentStates, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStates } from "./states"
import { ArchitectOptions } from "./options"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"

export type ArchitectStyle<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = <S extends Style>(style: S) => Omit<ArchitectSelf<Config, Links, Props, S, Stores, States, Values, Functions>,
    "style"
  >

export const ArchitectStyle = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet = any,
  Stores = any,
  States extends AppComponentStates = any,
  Values = any,
  Functions = any,
  >(
    options: ArchitectOptions<Config, Links, Props, any, Stores, States, Values, Functions>
  ): ArchitectStyle<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return <S extends Style>(style: S) => {
    options.context.style = style
    return {
      states: ArchitectStates<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      onInit: ArchitectOnInit<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      onMount: ArchitectOnMount<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      onUnmount: ArchitectOnUnmount<Config, Links, Props, S, Stores, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, S, Stores, States, Values, Functions>(options),
    }
  }
}
