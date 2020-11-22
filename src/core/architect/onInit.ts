import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { AppStyleSheet } from "../app/styles"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentValues,
} from "./component"
import { ArchitectContext } from "./context"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOnUpdate } from "./onUpdate"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectOnInit<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends AppStyleSheet,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions
  > = (
    onInit: (
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
    "style" | "states" | "stores" | "values" | "functions" | "onInit"
  >

export const ArchitectOnInit = <
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
): ArchitectOnInit<Config, Links, Props, Style, States, Values, Functions> => {
  return (onInit) => {
    options.cache.onInit = onInit
    return {
      onMount: ArchitectOnMount(options),
      onUpdate: ArchitectOnUpdate(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
