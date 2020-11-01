import { ArchitectType } from "."
import { AppComponentProps, AppComponentStates, AppConfig, AppGlobalState } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { ArchitectContext } from "./context"

export type ArchitectStep<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  Output,
  > = (
    step: {
      config: Config,
      global: AppGlobalState<keyof Links["themes"]>,
      type: ArchitectType,
      context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
    }
  ) => Output
