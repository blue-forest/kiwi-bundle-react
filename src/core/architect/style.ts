import { AppComponentProps, AppComponentStates, AppConfig, AppGlobalState } from "../app"
import { ArchitectType } from "."
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"
import { ArchitectStates } from "./states"

export type ArchitectStyle<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = (style: Style) => Omit<ArchitectSelf<Config, Links, Props, Style, Stores, States, Values, Functions>,
    "style"
  >

export const ArchitectStyle = <Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet = any,
  Stores = any,
  States extends AppComponentStates = any,
  Values = any,
  Functions = any,
  >(
    config: Config,
    globalState: AppGlobalState<keyof Links["themes"]>,
    type: ArchitectType,
): ArchitectStyle<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return style => {
    console.log(style)
    return {
      render: ArchitectRender<Config, Links, Props>(config, globalState, type),
      states: ArchitectStates<Config, Links, Props>(),
    }
  }
}
