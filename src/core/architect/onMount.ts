import { AppComponentProps, AppComponentStates, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { ArchitectContext } from "./context"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectOnMount<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = (
    onMount: (
      context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
    ) => void
  ) => Omit<ArchitectSelf<Config, Links, Props, Style, Stores, States, Values, Functions>,
    "style" | "stores" | "states" | "values" | "functions" | "onInit" | "onMount"
  >

export const ArchitectOnMount = <
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
  ): ArchitectOnMount<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return onMount => {
    options.cache.onMount = onMount
    return {
      onUnmount: ArchitectOnUnmount<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
      render: ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions>(options),
    }
  }
}