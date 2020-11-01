import { ArchitectType } from "."
import { AppComponentProps, AppComponentStates, AppConfig, AppGlobalState } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { ArchitectRender } from "./render"

export type ArchitectOnUnmount<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = () => {
    render: ArchitectRender<Config, Links, Props, Style, Stores, States, Values, Functions>
  }

export const ArchitectOnUnmount = <Config extends AppConfig,
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
): ArchitectOnUnmount<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return () => {
    return {
      render: ArchitectRender<Config, Links, Props>(config, globalState, type),
    }
  }
}
