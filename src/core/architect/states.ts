import { AppComponentProps, AppComponentStates, AppConfig } from "../app"
import { AppLinksImports } from "../links"
import { AppStyleSheet } from "../styles"
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
  > = <S extends number>(states: S) => Omit<ArchitectSelf<Config, Links, Props, Style, Stores, States, Values, Functions>,
    "style" | "stores" | "states"
  >

export const ArchitectStates = () => {
  /*if (typeof states !== "undefined") {
  Object.keys(states).forEach(name => {
    const state = React.useState(states[name])
    context.state.get[name] = state[0]
    context.state.set[name] = state[1]
  })
  }*/
}
