import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { AppStyleSheet } from "../app/styles"
import {
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentFunctions,
  ArchitectComponentValues,
} from "./component"
import { ArchitectContext } from "./context"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOnUpdate } from "./onUpdate"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectOnMount<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends AppStyleSheet,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions
  > = (
    onMount: (
      context: ArchitectContext<
        Config,
        Links,
        Props,
        Style,
        States,
        Values,
        Functions
      >,
    ) => void,
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
    "style" | "states" | "stores" | "values" | "functions" | "onInit" | "onMount"
  >

export const ArchitectOnMount = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends AppStyleSheet,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions
>(
  options: ArchitectOptions<
    Config,
    Links,
    Props,
    Style,
    States,
    Values,
    Functions
  >,
): ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions> => {
  return (onMount) => {
    options.cache.onMount = onMount
    return {
      onUpdate: ArchitectOnUpdate(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
