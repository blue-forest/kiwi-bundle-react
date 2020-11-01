import { AppComponentProps, AppComponentStates, AppConfig } from "../core/app"
import { AppLinksImports } from "../core/links"
import { AppStyleSheet } from "../core/styles"
import { Self } from "./self"

export type ArchitectFunctions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = (stores: Stores) => Omit<Self<Config, Links, Props, Style, Stores, States, Values, Functions>, "style" | "stores">
