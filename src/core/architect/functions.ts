import { AppConfig } from "../app/config"
import { AppLinksImports } from "../app/links"
import { ArchitectComponentFunctions, ArchitectComponentProps, ArchitectComponentStates, ArchitectComponentStyle, ArchitectComponentValues } from "./component"
import { ArchitectOnInit } from "./onInit"
import { ArchitectOnMount } from "./onMount"
import { ArchitectOnUnmount } from "./onUnmount"
import { ArchitectOptions } from "./options"
import { ArchitectRender } from "./render"
import { ArchitectSelf } from "./self"

export type ArchitectFunctions<
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle,
  States extends ArchitectComponentStates,
  Values extends ArchitectComponentValues,
  Functions extends ArchitectComponentFunctions,
  > = () => Omit<ArchitectSelf<Config, Links, Props, Style, States, Values, Functions>,
    "style" | "states" | "values" | "functions"
  >

export const ArchitectFunctions = <
  Config extends AppConfig,
  Links extends AppLinksImports<Config>,
  Props extends ArchitectComponentProps,
  Style extends ArchitectComponentStyle = any,
  States extends ArchitectComponentStates = any,
  Values extends ArchitectComponentValues = any,
  Functions extends ArchitectComponentFunctions = any,
  >(
    options: ArchitectOptions<Config, Links, Props, Style, States, Values, Functions>
  ): ArchitectFunctions<Config, Links, Props, Style, States, Values, Functions> => {
  return () => {
    return {
      onInit: ArchitectOnInit(options),
      onMount: ArchitectOnMount(options),
      onUnmount: ArchitectOnUnmount(options),
      render: ArchitectRender(options),
    }
  }
}
