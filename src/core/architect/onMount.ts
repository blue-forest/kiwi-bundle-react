import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentProps,
  ArchitectComponentStyle,
  ArchitectComponentStates,
  ArchitectComponentFunctions,
  ArchitectComponentValues,
} from "./component"
import { ArchitectContext } from "./context"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectOnMount<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, Values, Functions>,
  > = (
    onMount: (
      context: ArchitectContext<Config, Links, Props, Style, States, Values, Functions>
    ) => void
  ) => Omit<ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
    "style" | "states" | "values" | "functions" | "onInit" | "onMount"
  >

export const ArchitectOnMount = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions<Config, Links, Props, Style, States, Values, Functions> = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, States, Values, Functions>
  ): ArchitectOnMount<Config, Links, Props, Style, States, Values, Functions> => {
  return onMount => {
    options.cache.onMount = onMount
    return {
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
