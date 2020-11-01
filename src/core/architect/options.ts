import { ArchitectType } from "."
import { AppComponentProps, AppComponentStates, AppConfig, AppOptions } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { ArchitectContext } from "./context"

export type ArchitectOptions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps = any,
  Style extends AppStyleSheet = any,
  Stores = any,
  States extends AppComponentStates = any,
  Values = any,
  Functions = any,
  > = {
    type: ArchitectType
    app: {
      config: Config,
      options: AppOptions<keyof Links["themes"]>
    }
    context: ArchitectContext<Config, Links, Props, Style, Stores, States, Values, Functions>
  }
