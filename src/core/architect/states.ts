import { React } from "../../vendors"
import { AppComponentProps, AppComponentStates, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectStates<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends AppComponentProps,
  Style extends AppStyleSheet,
  Stores,
  States extends AppComponentStates,
  Values,
  Functions,
  > = <S extends States>(states: S) => Omit<ArchitectSelf<Config, Links, Props, Style, Stores, States, Values, Functions>,
    "style" | "stores" | "states"
  >

export const ArchitectStates = <
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
  ): ArchitectStates<Config, Links, Props, Style, Stores, States, Values, Functions> => {
  return states => {
    Object.keys(states).forEach(name => {
      const state = React.useState(states[name])
      options.context.state.get[name] = state[0]
      options.context.state.set[name] = state[1]
    })
    return {
      render: ArchitectRender<Config, Links, Props>(options),
    }
  }
}
