import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import {
  ArchitectComponentFunctions,
  ArchitectComponentProps,
  ArchitectComponentStates,
  ArchitectComponentStores,
  ArchitectComponentStyle,
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
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Stores extends ArchitectComponentStores,
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
        Stores,
        Values,
        Functions
      >,
    ) => void,
  ) => Omit<
    ArchitectSelf<Config, Links, Props, Style, States, Stores, Values, Functions>,
    "style" | "states" | "stores" | "values" | "functions" | "onInit"
  >

export const ArchitectOnInit = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Stores extends ArchitectComponentStores,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions
>(
  options: ArchitectOptions<
    Config,
    Links,
    Props,
    Style,
    States,
    Stores,
    Values,
    Functions
  >,
): ArchitectOnInit<
  Config,
  Links,
  Props,
  Style,
  States,
  Stores,
  Values,
  Functions
> => {
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
