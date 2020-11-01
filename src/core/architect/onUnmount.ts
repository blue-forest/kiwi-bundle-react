import { AppComponentProps, AppComponentStates, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { ArchitectContext } from "./context"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectOnUnmount<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = (
    onUnmount: (
      context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
    ) => void
  ) => Omit<ArchitectSelf<Config, Links, Props, Style, Stores, States, Values, Functions>,
    "style" | "stores" | "states" | "values" | "functions" | "onInit" | "onMount" | "onUnmount"
  >

export const ArchitectOnUnmount = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet = any,
  Stores = any,
  States extends AppComponentStates = any,
  Values = any,
  Functions = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, Stores, any, Values, Functions>
  ): ArchitectOnUnmount<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return onUnmount => {
    options.cache.onUnmount = onUnmount
    return {
      render: ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
    }
  }
}