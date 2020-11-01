import { ArchitectType } from "."
import { AppComponentProps, AppComponentStates, AppConfig, AppGlobalState } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { ArchitectContext } from "./context"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStates } from "./states"
import { ArchitectStyle } from "./style"

export type ArchitectValues<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = () => Omit<ArchitectSelf<Config, Links, Props, Style, Stores, States, Values, Functions>,
    "style" | "stores" | "states" | "values"
  >

export const ArchitectValues = <Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet = any,
  Stores = any,
  States extends AppComponentStates = any,
  Values = any,
  Functions = any,
  >(
    config: Config,
    global: AppGlobalState<keyof Links["themes"]>,
    type: ArchitectType,
): ArchitectStyle<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return () => {
    return {
      render: ArchitectRender<Config, Links, Props>(type),
      states: ArchitectStates<Config, Links, Props>(),
    }
  }
}

